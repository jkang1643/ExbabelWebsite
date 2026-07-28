import os
import re
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether, PageBreak
)

def md_to_pdf(md_file_path, pdf_file_path):
    with open(md_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    doc = SimpleDocTemplate(
        pdf_file_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Exbabel Brand Colors
    c_primary = colors.HexColor("#394DFE")
    c_ink = colors.HexColor("#0B1220")
    c_slate = colors.HexColor("#475569")
    c_bg_light = colors.HexColor("#F8F9FA")
    c_border = colors.HexColor("#CBD5E1")

    # Custom Styles
    style_title = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=c_primary,
        spaceAfter=6
    )

    style_subtitle = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=c_ink,
        spaceAfter=15
    )

    style_h1 = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=c_ink,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=c_primary,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_slate,
        spaceAfter=6
    )

    style_bullet = ParagraphStyle(
        'BulletCustom',
        parent=style_body,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=3
    )

    style_cell = ParagraphStyle(
        'CellText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=c_ink
    )

    style_cell_bold = ParagraphStyle(
        'CellTextBold',
        parent=style_cell,
        fontName='Helvetica-Bold'
    )

    style_cell_header = ParagraphStyle(
        'CellHeader',
        parent=style_cell,
        fontName='Helvetica-Bold',
        fontSize=8.5,
        textColor=colors.white
    )

    story = []

    # Title Block Header
    story.append(Paragraph("Exbabel vs. Wordly Real-Time Audio Latency Benchmark", style_title))
    story.append(Paragraph("LABORATORY BENCHMARK REPORT EXB-LAB-2026-001 | IEEE 829 & ISO/IEC 25010 COMPLIANT", style_subtitle))
    story.append(HRFlowable(width="100%", thickness=2, color=c_primary, spaceBefore=0, spaceAfter=12))

    lines = content.split('\n')
    in_table = False
    table_lines = []

    def clean_md_formatting(text):
        # Escape XML entities
        text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        # Bold
        text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
        # Italics
        text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
        # Code inline
        text = re.sub(r'`(.*?)`', r'<font face="Courier" color="#394DFE"><b>\1</b></font>', text)
        return text

    def render_table(t_lines):
        rows = []
        for idx, line in enumerate(t_lines):
            if not line.strip() or '---' in line:
                continue
            cells = [clean_md_formatting(c.strip()) for c in line.split('|')[1:-1]]
            if not cells:
                continue
            
            row_cells = []
            for cell_txt in cells:
                if idx == 0:
                    row_cells.append(Paragraph(cell_txt, style_cell_header))
                else:
                    row_cells.append(Paragraph(cell_txt, style_cell))
            rows.append(row_cells)
        
        if not rows:
            return None

        num_cols = len(rows[0])
        col_width = (7.0 * inch) / num_cols

        t = Table(rows, colWidths=[col_width] * num_cols)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), c_ink),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, c_border),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_bg_light]),
        ]))
        return t

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Handle Markdown Tables
        if stripped.startswith('|'):
            table_lines.append(line)
            in_table = True
            i += 1
            continue

        if in_table:
            t = render_table(table_lines)
            if t:
                story.append(Spacer(1, 4))
                story.append(t)
                story.append(Spacer(1, 8))
            table_lines = []
            in_table = False

        if not stripped:
            i += 1
            continue

        # Ignore markdown main title since header is rendered
        if stripped.startswith('# Exbabel'):
            i += 1
            continue

        # Headings
        if stripped.startswith('# '):
            h_text = clean_md_formatting(stripped[2:])
            story.append(Spacer(1, 8))
            story.append(Paragraph(h_text, style_h1))
            story.append(HRFlowable(width="100%", thickness=0.75, color=c_border, spaceBefore=2, spaceAfter=6))
        elif stripped.startswith('## '):
            h_text = clean_md_formatting(stripped[3:])
            story.append(Spacer(1, 6))
            story.append(Paragraph(h_text, style_h1))
        elif stripped.startswith('### '):
            h_text = clean_md_formatting(stripped[4:])
            story.append(Paragraph(h_text, style_h2))
        elif stripped.startswith('- ') or stripped.startswith('* '):
            b_text = clean_md_formatting(stripped[2:])
            story.append(Paragraph(f"• {b_text}", style_bullet))
        elif re.match(r'^\d+\.\s', stripped):
            b_text = clean_md_formatting(re.sub(r'^\d+\.\s', '', stripped))
            num = stripped.split('.')[0]
            story.append(Paragraph(f"<b>{num}.</b> {b_text}", style_bullet))
        else:
            p_text = clean_md_formatting(stripped)
            story.append(Paragraph(p_text, style_body))

        i += 1

    if in_table:
        t = render_table(table_lines)
        if t:
            story.append(Spacer(1, 4))
            story.append(t)

    # Page number footer callback
    def add_footer(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(c_slate)
        canvas.drawString(54, 30, "EXBABEL RESEARCH LAB • REPORT EXB-LAB-2026-001 • CONFIDENTIAL & VERIFIED")
        canvas.drawRightString(612 - 54, 30, f"Page {doc.page}")
        canvas.setStrokeColor(c_border)
        canvas.setLineWidth(0.5)
        canvas.line(54, 42, 612 - 54, 42)
        canvas.restoreState()

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f"Successfully generated PDF report at: {pdf_file_path}")

if __name__ == "__main__":
    md_file = "/home/jkang1643/projects/exbabel/lab test/lab_report.md"
    pdf_dest1 = "/home/jkang1643/projects/exbabel/public/docs/exbabel_vs_wordly_lab_report.pdf"
    pdf_dest2 = "/home/jkang1643/projects/exbabel/lab test/exbabel_vs_wordly_lab_report.pdf"

    md_to_pdf(md_file, pdf_dest1)
    md_to_pdf(md_file, pdf_dest2)
