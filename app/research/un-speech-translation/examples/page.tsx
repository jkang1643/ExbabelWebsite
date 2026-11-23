import {readFileSync} from 'fs';
import path from 'path';
export const metadata={title:'Translation choices | Exbabel Research'};
export default function Cases(){return <main className="labwrap"><div className="crumb"><a href="/research/un-speech-translation/">UN speech study</a> › Casebook</div><h1>Translation choices</h1><div className="evidence cases" dangerouslySetInnerHTML={{__html:readFileSync(path.join(process.cwd(),'data/research/cases.html'),'utf8')}}/></main>}
