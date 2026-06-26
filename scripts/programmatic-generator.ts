import { Command } from 'commander';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();
program
  .requiredOption('-t, --template <path>', 'Path to the markdown template/wireframe')
  .requiredOption('-v, --variables <path>', 'Path to JSON file containing the array of variables')
  .option('-o, --output <dir>', 'Output directory', 'seo-reports/generated-programmatic-pages')
  .option('-m, --mock', 'Run in mock mode')
  .parse(process.argv);

const options = program.opts();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const EXBABEL_CONTEXT = `
Exbabel is an AI-powered real-time translation and captioning SaaS platform designed specifically for churches, ministries, and live events.
It supports 180+ languages, uses a context-aware AI engine (trained on theological phrases and Bible verses), and requires no app downloads—attendees simply scan a QR code to listen to translated audio or read live captions on their phones.
Key selling points: affordability, no hardware, speech-to-speech voice cloning, and easy integration with OBS/livestreams.
`;

async function main() {
  console.log(`\n🚀 Starting Exbabel Programmatic Page Generator`);
  
  const templatePath = path.resolve(process.cwd(), options.template);
  const variablesPath = path.resolve(process.cwd(), options.variables);

  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template file not found: ${templatePath}`);
    process.exit(1);
  }
  if (!fs.existsSync(variablesPath)) {
    console.error(`❌ Variables file not found: ${variablesPath}`);
    process.exit(1);
  }

  const templateStr = fs.readFileSync(templatePath, 'utf-8');
  const variablesObj = JSON.parse(fs.readFileSync(variablesPath, 'utf-8'));
  const variablesList: Record<string, string>[] = variablesObj.variables || [];

  if (variablesList.length === 0) {
    console.error(`❌ No variables found in JSON. Expected format: { "variables": [{ "city": "Houston" }, ...] }`);
    process.exit(1);
  }

  const outputDir = path.resolve(process.cwd(), options.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`📝 Loaded template and ${variablesList.length} variables to process.`);

  for (let i = 0; i < variablesList.length; i++) {
    const data = variablesList[i];
    const identifier = Object.values(data).join('-');
    console.log(`\n⚙️  Generating Page ${i + 1}/${variablesList.length} for: ${identifier}...`);

    if (options.mock) {
      console.log('   [MOCK] Skipping API...');
      continue;
    }

    const promptData = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');

    console.log('   ✓ Generating Programmatic Page...');
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: `You are Exbabel's Programmatic Content Engine. ${EXBABEL_CONTEXT}` },
        { role: 'user', content: `Generate a highly converting SEO landing page based strictly on this template framework.
        
Data Variables to Inject:
${promptData}

Landing Page Template Framework:
${templateStr}

Generate the final, fully-written markdown content for this specific page. Ensure you replace all placeholders with highly specific, localized, or nuanced copy relevant to the injected variables. Use specific, verifiable-sounding details.` }
      ]
    });

    const pageContent = response.choices[0].message.content || '';
    const safeTitle = identifier.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    
    const outputPath = path.join(outputDir, `${safeTitle}.md`);
    fs.writeFileSync(outputPath, pageContent);
    console.log(`   ✓ Saved to: ${outputPath}`);
  }
  console.log(`\n🎉 Programmatic generation complete! Output saved to: ${outputDir}\n`);
}

main().catch(console.error);
