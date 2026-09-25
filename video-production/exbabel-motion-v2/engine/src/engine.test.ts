import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { importCsv } from './csv.js';
import { DemoRecordSchema, publicConfig } from './schema.js';
import { spliceNarration, VoiceReviewRequired } from './voice.js';

const exec=promisify(execFile),root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
test('acceptance CSV normalizes two churches and public configs differ without private fields',()=>{
  const result=importCsv('church_name,first_name,location,size,phone\nFirst Pentecostal Church,John,Houston TX,1200,7135551234\nLiving Hope Church,Jason,Lexington Park MD,850,3015559999\n');
  assert.deepEqual(result.errors,[]);assert.equal(result.valid.length,2);
  assert.equal(result.valid[0].prospect.phone,'713-555-1234');
  assert.equal(result.valid[1].prospect.city,'Lexington Park');
  const config=result.valid.map((v,i)=>publicConfig(DemoRecordSchema.parse({id:`b7288a37-0961-4f69-bb0b-96483456b99${i}`,publicToken:`token-${i}-ABC123`,prospect:v.prospect,status:'pending'}),'http://localhost:3020'));
  assert.notEqual(config[0].content.introChurchName,config[1].content.introChurchName);
  assert.equal(JSON.stringify(config).includes('713-555-1234'),false);
  assert.equal(config[0].voice.segmentEndMs,6650);
});
test('CSV rejects invalid rows and URL script schemes',()=>{
  const data=importCsv('church_name,website\nExample Church,javascript:alert(1)\nValid Church,example.org\n');
  assert.equal(data.valid.length,1);assert.equal(data.errors.length,1);
});
test('narration splice preserves fixed timing and original samples outside the slot',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'exbabel-audio-test-'));
  try{
    const voice=join(dir,'voice.wav'),output=join(dir,'final.wav'),master=join(root,'assets/narration.wav');
    await exec('ffmpeg',['-v','error','-f','lavfi','-i','sine=frequency=300:duration=1','-ac','1','-ar','48000',voice]);
    const result=await spliceNarration({masterPath:master,segmentPath:voice,outputPath:output});
    assert.equal(result.durationMs,123800);
    const decode=async(path:string)=>(await exec('ffmpeg',['-v','error','-i',path,'-f','s16le','-ac','1','-ar','48000','pipe:1'],{encoding:'buffer',maxBuffer:20_000_000})).stdout as Buffer;
    const [before,after]=await Promise.all([decode(master),decode(output)]);
    assert.equal(after.length,123800*48*2);
    assert.deepEqual(after.subarray(0,4700*48*2),before.subarray(0,4700*48*2));
    assert.deepEqual(after.subarray(6650*48*2,10000*48*2),before.subarray(6650*48*2,10000*48*2));
    assert.notDeepEqual(after.subarray(4700*48*2,5700*48*2),before.subarray(4700*48*2,5700*48*2));
  }finally{await rm(dir,{recursive:true,force:true})}
});
