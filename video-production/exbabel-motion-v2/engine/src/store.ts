import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DemoRecordSchema, type DemoRecord } from './schema.js';

export class DemoStore {
  private db:DatabaseSync;
  constructor(path:string){
    mkdirSync(dirname(path),{recursive:true});
    this.db=new DatabaseSync(path);
    this.db.exec(`PRAGMA journal_mode=WAL;
      CREATE TABLE IF NOT EXISTS demos (
        id TEXT PRIMARY KEY, public_token TEXT NOT NULL UNIQUE,
        identity_key TEXT NOT NULL UNIQUE, salesforce_id TEXT,
        record_json TEXT NOT NULL, status TEXT NOT NULL,
        created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
        first_viewed_at TEXT, last_viewed_at TEXT,
        view_count INTEGER NOT NULL DEFAULT 0,
        play_count INTEGER NOT NULL DEFAULT 0,
        completed_count INTEGER NOT NULL DEFAULT 0
      );
      CREATE INDEX IF NOT EXISTS demos_salesforce_idx ON demos(salesforce_id);
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT, demo_id TEXT NOT NULL,
        event TEXT NOT NULL, occurred_at TEXT NOT NULL,
        FOREIGN KEY(demo_id) REFERENCES demos(id)
      );`);
  }
  get(token:string):DemoRecord|undefined{
    const row=this.db.prepare('SELECT record_json FROM demos WHERE public_token=?').get(token) as {record_json:string}|undefined;
    return row?DemoRecordSchema.parse(JSON.parse(row.record_json)):undefined;
  }
  getByIdentity(key:string):DemoRecord|undefined{
    const row=this.db.prepare('SELECT record_json FROM demos WHERE identity_key=?').get(key) as {record_json:string}|undefined;
    return row?DemoRecordSchema.parse(JSON.parse(row.record_json)):undefined;
  }
  put(record:DemoRecord,identityKey:string):void{
    const validated=DemoRecordSchema.parse(record),now=new Date().toISOString();
    this.db.prepare(`INSERT INTO demos(id,public_token,identity_key,salesforce_id,record_json,status,created_at,updated_at)
      VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET
      salesforce_id=excluded.salesforce_id,record_json=excluded.record_json,status=excluded.status,updated_at=excluded.updated_at`)
      .run(validated.id,validated.publicToken,identityKey,validated.salesforceId||null,JSON.stringify(validated),validated.status,now,now);
  }
  update(record:DemoRecord):void{
    const r=DemoRecordSchema.parse(record);
    this.db.prepare('UPDATE demos SET record_json=?,status=?,updated_at=? WHERE id=?')
      .run(JSON.stringify(r),r.status,new Date().toISOString(),r.id);
  }
  list(limit=500):{record:DemoRecord;stats:Record<string,unknown>}[]{
    return (this.db.prepare('SELECT record_json,status,view_count,play_count,completed_count,last_viewed_at FROM demos ORDER BY created_at DESC LIMIT ?').all(limit) as Record<string,unknown>[])
      .map(r=>({record:DemoRecordSchema.parse(JSON.parse(String(r.record_json))),stats:{viewCount:r.view_count,playCount:r.play_count,completedCount:r.completed_count,lastViewedAt:r.last_viewed_at}}));
  }
  event(record:DemoRecord,event:string):void{
    const now=new Date().toISOString();
    this.db.prepare('INSERT INTO events(demo_id,event,occurred_at) VALUES(?,?,?)').run(record.id,event,now);
    if(event==='demo_opened')this.db.prepare('UPDATE demos SET view_count=view_count+1,first_viewed_at=COALESCE(first_viewed_at,?),last_viewed_at=? WHERE id=?').run(now,now,record.id);
    if(event==='demo_started')this.db.prepare('UPDATE demos SET play_count=play_count+1 WHERE id=?').run(record.id);
    if(event==='demo_completed')this.db.prepare('UPDATE demos SET completed_count=completed_count+1 WHERE id=?').run(record.id);
  }
}
