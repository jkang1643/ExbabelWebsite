import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { publicConfig, type DemoRecord } from './schema.js';

/** One temporary copy of the canonical HyperFrames source, never a second composition. */
export async function exportMp4(record:DemoRecord,root:string,outputPath:string):Promise<void>{
  if(record.status!=='ready'||!record.audioPath)throw Error('Personalized narration must be ready before MP4 export');
  const dir=await mkdtemp(join(tmpdir(),'exbabel-hf-export-'));
  try{
    await Promise.all(['compositions','assets'].map(n=>cp(join(root,n),join(dir,n),{recursive:true})));
    await cp(join(root,'hyperframes.json'),join(dir,'hyperframes.json'));
    await cp(record.audioPath,join(dir,'assets/narration.wav'));
    const source=await readFile(join(root,'index.html'),'utf8');
    const config=JSON.stringify(publicConfig(record)).replace(/</g,'\\u003c');
    await writeFile(join(dir,'index.html'),source.replace('<head>',`<head><script>window.__EXBABEL_PUBLIC_CONFIG__=${config};</script>`));
    await new Promise<void>((resolve,reject)=>{
      const p=spawn(join(root,'node_modules/.bin/hyperframes'),['render','--quality','delivery','--fps','30','--workers','2','--output',outputPath,dir],{cwd:root,stdio:'inherit'});
      p.on('error',reject);p.on('close',code=>code===0?resolve():reject(Error(`HyperFrames render exited ${code}`)));
    });
  }finally{await rm(dir,{recursive:true,force:true})}
}
