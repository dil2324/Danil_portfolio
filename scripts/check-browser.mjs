import {createServer} from 'node:http';
import {readFile,writeFile,mkdir,mkdtemp,access} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=join(root,'artifacts'); await mkdir(out,{recursive:true});
const chromePath=process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
await access(chromePath);
const assets={'/':['index.html','text/html'],'/styles.css':['styles.css','text/css'],'/app.js':['app.js','text/javascript'],'/favicon.svg':['favicon.svg','image/svg+xml']};
const server=createServer(async(req,res)=>{
 const asset=assets[new URL(req.url,'http://localhost').pathname];
 if(!asset){res.writeHead(404);res.end();return;}
 try{res.writeHead(200,{'Content-Type':asset[1]+'; charset=utf-8'});res.end(await readFile(join(root,asset[0])));}
 catch{res.writeHead(500);res.end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const profile=await mkdtemp(join(tmpdir(),'danil-portfolio-check-'));
const chrome=spawn(chromePath,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
let socket; const report={checks:[],errors:[],screenshots:[]};
try{
 const url=await new Promise((r,j)=>{let data='';const timer=setTimeout(()=>j(Error('Chrome startup timeout')),20000);chrome.once('error',j);chrome.stderr.on('data',chunk=>{data+=chunk;const match=data.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(match){clearTimeout(timer);r(match[1]);}});});
 socket=new WebSocket(url);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 let id=0,session;const pending=new Map();
 socket.onmessage=event=>{const msg=JSON.parse(event.data);if(pending.has(msg.id)){const p=pending.get(msg.id);clearTimeout(p.timer);pending.delete(msg.id);msg.error?p.j(Error(msg.error.message)):p.r(msg.result);}if(msg.method==='Runtime.exceptionThrown')report.errors.push(msg.params.exceptionDetails.text);};
 const send=(method,params={},global=false)=>new Promise((r,j)=>{const key=++id;const timer=setTimeout(()=>{pending.delete(key);j(Error('Timeout: '+method));},15000);pending.set(key,{r,j,timer});socket.send(JSON.stringify({id:key,method,params,...(!global&&session?{sessionId:session}:{})}));});
 const target=await send('Target.createTarget',{url:'about:blank'},true);
 session=(await send('Target.attachToTarget',{targetId:target.targetId,flatten:true},true)).sessionId;
 await send('Runtime.enable');await send('Page.enable');
 const ev=async expression=>{const v=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(v.exceptionDetails)throw Error(JSON.stringify(v.exceptionDetails));return v.result.value;};
 const wait=async expression=>{for(let n=0;n<100;n++){if(await ev(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Not ready: '+expression);};
 const check=(label,a,b)=>{assert.deepEqual(a,b,label);report.checks.push(label);};
 const viewport=async width=>{await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});await ev('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');};
 const shot=async name=>{await new Promise(r=>setTimeout(r,350));await ev('window.scrollTo({top:0,behavior:"instant"})');const layout=await send('Page.getLayoutMetrics');const pic=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:layout.cssContentSize.width,height:layout.cssContentSize.height,scale:1}});await writeFile(join(out,name+'.png'),Buffer.from(pic.data,'base64'));report.screenshots.push(name+'.png');};
 await viewport(1440);await send('Page.navigate',{url:origin});
 await wait('document.querySelectorAll(".project").length===5');
 await ev('Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,4000))]).then(()=>true)');
 check('5 project cards',await ev('document.querySelectorAll(".project").length'),5);
 check('Adzuna experience',await ev('document.querySelector("#experience").textContent.includes("Adzuna")'),true);
 for(const [filter,count] of [['backend',2],['bots',2],['frontend',1],['all',5]]){
  await ev('document.querySelector(\'[data-filter="'+filter+'"]\').click()');
  check('Filter '+filter,await ev('document.querySelectorAll(".project:not([hidden])").length'),count);
 }
 await ev('document.querySelector(".project-detail").focus();document.querySelector(".project-detail").click()');
 check('Project dialog',await ev('document.querySelector("dialog").open && document.querySelector("#dialog-title").textContent==="AI Assistant API"'),true);
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 await wait('!document.querySelector("dialog").open && !document.body.classList.contains("modal-open")');
 check('Escape and focus restoration',await ev('!document.body.classList.contains("modal-open") && document.activeElement.matches(".project-detail")'),true);
 await ev('document.querySelector(".theme-toggle").click()');
 check('Dark theme',await ev('document.documentElement.dataset.theme'),'dark');
 await send('Page.reload');await wait('document.querySelectorAll(".project").length===5');
 check('Theme persists',await ev('document.documentElement.dataset.theme'),'dark');
 await shot('desktop-dark');await ev('document.querySelector(".theme-toggle").click()');await shot('desktop');
 for(const width of [1440,1024,768,520,390,320]){
  await viewport(width);
  const size=await ev('({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll("body *")].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.right>innerWidth+1}).map(e=>e.className).slice(0,8)})');
  check('No overflow '+width+'px '+JSON.stringify(size),size.scroll<=width,true);
  const smallText=await ev('[...document.querySelectorAll("body *")].filter(e=>e.getClientRects().length&&!e.closest(".sr-only")&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(e).fontSize)<16).map(e=>({element:e.className||e.tagName,size:getComputedStyle(e).fontSize}))');
  check('Text at least 16px at '+width+'px',smallText,[]);
  const clipped=await ev('[...document.querySelectorAll(".terminal,.code-line code,.project-visual,.api-window,.chat-window,.booking,.todo-window,.coffee-preview,.project-info")].filter(e=>e.getClientRects().length&&e.scrollWidth>e.clientWidth+1).map(e=>e.className)');
  check('No clipped panels at '+width+'px',clipped,[]);
 }
 await shot('mobile-320');
 for(const id of ['ai-api','ai-bot','barber','todo','coffee']){
  await ev('document.querySelector(\'.project-more[data-project="'+id+'"]\').focus();document.querySelector(\'.project-more[data-project="'+id+'"]\').click()');
  check('Project details '+id,await ev('document.querySelector("dialog").open && document.querySelector("#dialog-content").textContent.includes("Ограничения и что проверить")'),true);
  check('Dialog fits 320px '+id,await ev('document.querySelector("dialog").scrollWidth<=document.querySelector("dialog").clientWidth'),true);
  if(id==='ai-api')await shot('dialog-320');
  await ev('document.querySelector("#close-dialog").click()');
  await wait('!document.body.classList.contains("modal-open")');
  check('Close button and focus '+id,await ev('document.activeElement.matches(".project-more")'),true);
 }
 await ev('document.querySelector(".theme-toggle").click()');await shot('mobile-320-dark');
 await ev('document.querySelector(".theme-toggle").click()');
 await viewport(390);await ev('document.querySelector(".menu-toggle").click()');
 check('Mobile menu opens',await ev('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'),'true');
 await ev('document.querySelector("#navigation a").click()');
 check('Mobile menu closes',await ev('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'),'false');
 await shot('mobile');
 await send('Browser.grantPermissions',{origin,permissions:['clipboardReadWrite','clipboardSanitizedWrite']},true);
 await ev('document.querySelector("#copy-email").click()');
 await wait('document.querySelector("#toast").textContent==="Email скопирован"');
 check('Copy email',await ev('navigator.clipboard.readText()'),'di0230518@gmail.com');
 check('No JavaScript errors',report.errors,[]);
 report.passed=true;console.log('PASS: '+report.checks.length+' browser checks. Screenshots: artifacts/');
 await send('Browser.close',{},true).catch(()=>{});
}catch(error){report.passed=false;report.failure=error.message;console.error(error.message);process.exitCode=1;}
finally{await writeFile(join(out,'browser-report.json'),JSON.stringify(report,null,2));socket?.close();chrome.kill();server.close();}

