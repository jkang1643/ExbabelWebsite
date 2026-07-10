import zipfile
import xml.etree.ElementTree as ET
import sys
try:
    with zipfile.ZipFile(sys.argv[1]) as docx:
        tree = ET.XML(docx.read("word/document.xml"))
        for p in tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
            text = "".join(node.text for node in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t") if node.text)
            if text:
                print(text)
except Exception as e:
    print(e)
