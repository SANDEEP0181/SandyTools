function openTool(id){
const panel=document.getElementById(id);
if(!panel)return;
document.querySelectorAll(".tool-panel").forEach(function(p){if(p!==panel)p.style.display="none";});
panel.style.display=panel.style.display==="block"?"none":"block";
}
function calculatePercentage(){let v=Number(document.getElementById("percentValue").value),t=Number(document.getElementById("percentTotal").value);document.getElementById("percentResult").innerText=t?"Result: "+((v/t)*100).toFixed(2)+"%":"Enter valid values";}
function calculateAge(){let d=new Date(document.getElementById("birthDate").value);if(isNaN(d)){document.getElementById("ageResult").innerText="Select birth date";return;}let n=new Date(),a=n.getFullYear()-d.getFullYear(),m=n.getMonth()-d.getMonth();if(m<0||(m===0&&n.getDate()<d.getDate()))a--;document.getElementById("ageResult").innerText="Age: "+a+" years";}
function calculateEMI(){let P=Number(document.getElementById("loanAmount").value),annual=Number(document.getElementById("interestRate").value),years=Number(document.getElementById("loanYears").value);if(!P||!years){document.getElementById("emiResult").innerText="Enter valid values";return;}let r=annual/1200,n=years*12,emi=r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n;document.getElementById("emiResult").innerText="Monthly EMI: Rs "+emi.toFixed(2);}
function calculateGST(){let a=Number(document.getElementById("gstAmount").value),r=Number(document.getElementById("gstRate").value),g=a*r/100;document.getElementById("gstResult").innerText="GST: Rs "+g.toFixed(2)+" | Total: Rs "+(a+g).toFixed(2);}
function calculateSIP(){let p=Number(document.getElementById("sipMonthly").value),rate=Number(document.getElementById("sipRate").value),years=Number(document.getElementById("sipYears").value),n=years*12,r=rate/1200,f=r?p*((Math.pow(1+r,n)-1)/r)*(1+r):p*n;document.getElementById("sipResult").innerText="Estimated Value: Rs "+f.toFixed(2);}
function calculateDiscount(){let p=Number(document.getElementById("discountPrice").value),r=Number(document.getElementById("discountRate").value),d=p*r/100;document.getElementById("discountResult").innerText="Discount: Rs "+d.toFixed(2)+" | Final Price: Rs "+(p-d).toFixed(2);}
function generateTitle(){let t=document.getElementById("titleTopic").value.trim();document.getElementById("titleResult").innerText=t?"Amazing "+t+" - Watch Till The End":"Enter a topic first";}
function generateDescription(){let t=document.getElementById("descriptionTopic").value.trim();document.getElementById("descriptionResult").innerText=t?"Welcome to our video about "+t+". Watch till the end and subscribe for more videos.":"Enter a topic first";}
function generateHashtags(){let t=document.getElementById("hashtagTopic").value.trim();if(!t){document.getElementById("hashtagResult").innerText="Enter a topic first";return;}document.getElementById("hashtagResult").innerText=t.split(/\s+/).map(function(w){return "#"+w.replace(/[^a-zA-Z0-9]/g,"");}).join(" ")+" #YouTube #Trending #Viral";}
function countWords(){let t=document.getElementById("wordText").value.trim();document.getElementById("wordResult").innerText="Words: "+(t?t.split(/\s+/).length:0);}
function countCharacters(){document.getElementById("characterResult").innerText="Characters: "+document.getElementById("characterText").value.length;}
function toUpperCaseText(){document.getElementById("caseResult").innerText=document.getElementById("caseText").value.toUpperCase();}
function toLowerCaseText(){document.getElementById("caseResult").innerText=document.getElementById("caseText").value.toLowerCase();}
function dateDifference(){let a=new Date(document.getElementById("dateOne").value),b=new Date(document.getElementById("dateTwo").value);if(isNaN(a)||isNaN(b)){document.getElementById("dateResult").innerText="Select both dates";return;}document.getElementById("dateResult").innerText="Difference: "+Math.abs(Math.round((b-a)/86400000))+" days";}
function calculateTime(){let a=document.getElementById("timeOne").value,b=document.getElementById("timeTwo").value;if(!a||!b){document.getElementById("timeResult").innerText="Select both times";return;}let x=a.split(":").map(Number),y=b.split(":").map(Number),d=Math.abs((y[0]*60+y[1])-(x[0]*60+x[1]));document.getElementById("timeResult").innerText="Difference: "+Math.floor(d/60)+" hours "+d%60+" minutes";}
function convertUnit(){let v=Number(document.getElementById("unitValue").value),t=document.getElementById("unitType").value,r=0;if(t==="kmm")r=v*0.621371;if(t==="mikm")r=v*1.60934;if(t==="kgp")r=v*2.20462;if(t==="lbkg")r=v*0.453592;if(t==="cmft")r=v*0.0328084;if(t==="ftcm")r=v*30.48;document.getElementById("unitResult").innerText="Result: "+r.toFixed(4);}
function generatePassword(){
let n=Math.min(100,Math.max(4,Number(document.getElementById("passwordLength")?.value)||16));
let c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-+=?";
let p="";
let values=new Uint32Array(n);
if(window.crypto&&window.crypto.getRandomValues){window.crypto.getRandomValues(values);for(let i=0;i<n;i++)p+=c[values[i]%c.length];}
else{for(let i=0;i<n;i++)p+=c[Math.floor(Math.random()*c.length)];}
let out=document.getElementById("passwordResult");
out.innerHTML="<strong>"+p+"</strong><br><button type='button' onclick='copyToolText("+JSON.stringify(p)+")'>Copy Password</button>";
}
function compressImageFile(){
let file=document.getElementById("compressImage")?.files[0],result=document.getElementById("compressResult");
if(!file){result.innerText="Select an image first.";return;}
let img=new Image(),reader=new FileReader();
reader.onload=function(e){img.onload=function(){
let canvas=document.createElement("canvas");canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
canvas.getContext("2d").drawImage(img,0,0);
let quality=Number(document.getElementById("compressQuality")?.value||70)/100;
let outputType=document.getElementById("compressFormat")?.value||"image/jpeg";
canvas.toBlob(function(blob){
if(!blob){result.innerText="Compression failed.";return;}
let oldSize=(file.size/1024).toFixed(1),newSize=(blob.size/1024).toFixed(1);
let ext=outputType==="image/png"?"png":outputType==="image/webp"?"webp":"jpg";
showDownloadButton(result,blob,"SandyTools-Compressed."+ext,"Compression completed.");
let change=file.size?((1-blob.size/file.size)*100).toFixed(1):"0.0";
result.innerText="Original: "+oldSize+" KB → "+newSize+" KB ("+(change>=0?change+"% smaller":Math.abs(change)+"% larger")+"). Download started.";
},outputType,quality);
};img.src=e.target.result;};reader.readAsDataURL(file);
}
function resizeImageFile(){
let file=document.getElementById("resizeImage")?.files[0],result=document.getElementById("resizeResult");
let width=Number(document.getElementById("resizeWidth")?.value),height=Number(document.getElementById("resizeHeight")?.value);
if(!file){result.innerText="Select an image first.";return;}
if(!width||width<1){result.innerText="Enter a valid width.";return;}
let img=new Image(),reader=new FileReader();
reader.onload=function(e){img.onload=function(){
if(document.getElementById("keepRatio")?.checked)height=Math.round(width*img.naturalHeight/img.naturalWidth);
if(!height||height<1){result.innerText="Enter a valid height.";return;}
let canvas=document.createElement("canvas");canvas.width=width;canvas.height=height;
canvas.getContext("2d").drawImage(img,0,0,width,height);
let type=file.type==="image/png"?"image/png":file.type==="image/webp"?"image/webp":"image/jpeg";
canvas.toBlob(function(blob){if(!blob){result.innerText="Resize failed.";return;}let ext=type==="image/png"?"png":type==="image/webp"?"webp":"jpg";showDownloadButton(result,blob,"SandyTools-Resized."+ext,"Resized to "+width+" × "+height+" px.");},type,.92);
};img.src=e.target.result;};reader.readAsDataURL(file);
}
function generateQR(){
let text=document.getElementById("qrText").value.trim();
let result=document.getElementById("qrResult");
if(!text){result.innerText="Enter text or URL first.";return;}
let qrUrl="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+encodeURIComponent(text);
result.innerHTML="<img id='generatedQR' src='" + qrUrl + "' alt='QR Code' style='max-width:300px;width:100%;display:block;margin:auto;'><br><button onclick=\"downloadQR('" + qrUrl + "')\">Download QR Code</button>";
}
function downloadQR(url){
let link=document.createElement("a");
link.href=url;
link.download="SandyTools-QR-Code.png";
link.target="_blank";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}
document.addEventListener("DOMContentLoaded",function(){
let s=document.getElementById("searchTools");
if(s){s.addEventListener("input",function(){let q=this.value.toLowerCase();document.querySelectorAll(".tool-box").forEach(function(b){b.classList.toggle("hidden",!b.dataset.name.includes(q));});});}
});

async function mergePDFs(){

let files=document.getElementById("pdfFiles").files;
let result=document.getElementById("pdfResult");

if(files.length<2){
result.innerText="Select at least two PDF files.";
return;
}

if(typeof PDFLib==="undefined"){
result.innerText="PDF library is loading. Refresh and try again.";
return;
}

try{

let mergedPdf=await PDFLib.PDFDocument.create();

for(let file of files){

let bytes=await file.arrayBuffer();
let pdf=await PDFLib.PDFDocument.load(bytes);
let pages=await mergedPdf.copyPages(pdf,pdf.getPageIndices());

pages.forEach(function(page){
mergedPdf.addPage(page);
});

}

let mergedBytes=await mergedPdf.save();

let blob=new Blob([mergedBytes],{type:"application/pdf"});
let url=URL.createObjectURL(blob);

result.innerHTML=
files.length+" PDF files merged successfully.<br>"+
"<a href='"+url+"' download='SandyTools-Merged.pdf'>Download Merged PDF</a>";

}catch(error){

result.innerText="Could not merge PDF files. Please check the selected files.";

}

}


/* SandyTools — New popular tools */
function showDownloadButton(result,blob,name,message){
let url=URL.createObjectURL(blob);
result.innerHTML=message+'<br><a class="download-btn" href="'+url+'" download="'+name+'">⬇ Download '+name+'</a>';
}
function downloadBlob(blob,name){
let url=URL.createObjectURL(blob),a=document.createElement("a");
a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
setTimeout(function(){URL.revokeObjectURL(url)},1000);
}
async function jpgToPDF(){
let file=document.getElementById("jpgPdfFile")?.files[0],result=document.getElementById("jpgPdfResult");
if(!file){result.innerText="Select an image first.";return;}
if(typeof PDFLib==="undefined"){result.innerText="PDF library is loading. Refresh and try again.";return;}
try{
let bytes=await file.arrayBuffer(),pdf=await PDFLib.PDFDocument.create(),img;
if(file.type==="image/png") img=await pdf.embedPng(bytes); else img=await pdf.embedJpg(bytes);
let scale=Math.min(1,595/img.width),w=img.width*scale,h=img.height*scale;
let page=pdf.addPage([w,h]);page.drawImage(img,{x:0,y:0,width:w,height:h});
let out=await pdf.save();downloadBlob(new Blob([out],{type:"application/pdf"}),"SandyTools-Image.pdf");
result.innerText="PDF created successfully.";
}catch(e){result.innerText="Could not create PDF. Please use JPG or PNG.";}
}
async function loadPdfJs(){
if(window.pdfjsLib)return window.pdfjsLib;
return await new Promise(function(resolve,reject){
let s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
s.onload=function(){setTimeout(function(){if(window.pdfjsLib)resolve(window.pdfjsLib);else reject(new Error("PDF.js unavailable"));},500)};
s.onerror=reject;document.head.appendChild(s);
});
}
async function pdfToJPG(){
let file=document.getElementById("pdfJpgFile")?.files[0],result=document.getElementById("pdfJpgResult");
let pageNo=Math.max(1,Number(document.getElementById("pdfJpgPage")?.value)||1);
if(!file){result.innerText="Select a PDF first.";return;}
result.innerText="Rendering PDF page…";
try{
let lib=await loadPdfJs();if(!lib||!lib.getDocument)throw new Error("load");
let data=await file.arrayBuffer(),pdf=await lib.getDocument({data}).promise;
if(pageNo>pdf.numPages){result.innerText="Page "+pageNo+" does not exist. This PDF has "+pdf.numPages+" pages.";return;}
let page=await pdf.getPage(pageNo),viewport=page.getViewport({scale:1.5}),canvas=document.createElement("canvas");
canvas.width=viewport.width;canvas.height=viewport.height;
await page.render({canvasContext:canvas.getContext("2d"),viewport}).promise;
canvas.toBlob(function(blob){downloadBlob(blob,"SandyTools-PDF-Page-"+pageNo+".jpg");result.innerText="Page "+pageNo+" converted to JPG. Download started.";}, "image/jpeg", .92);
}catch(e){result.innerText="PDF to JPG could not load in this browser. Try again.";}
}
async function compressPDF(){
let file=document.getElementById("compressPdfFile")?.files[0],result=document.getElementById("compressPdfResult");
if(!file){result.innerText="Select a PDF first.";return;}
if(typeof PDFLib==="undefined"){result.innerText="PDF library is loading. Refresh and try again.";return;}
try{
let pdf=await PDFLib.PDFDocument.load(await file.arrayBuffer()),out=await pdf.save({useObjectStreams:true,addDefaultPage:false});
let oldSize=(file.size/1024).toFixed(1),newSize=(out.length/1024).toFixed(1);
downloadBlob(new Blob([out],{type:"application/pdf"}),"SandyTools-Compressed.pdf");
result.innerText="Processed: "+oldSize+" KB → "+newSize+" KB. PDF structure was optimized; image-heavy PDFs may not shrink much.";
}catch(e){result.innerText="Could not process this PDF.";}
}
async function splitPDF(){
let file=document.getElementById("splitPdfFile")?.files[0],result=document.getElementById("splitPdfResult");
if(!file){result.innerText="Select a PDF first.";return;}
let start=Math.max(1,Number(document.getElementById("splitStart")?.value)||1),end=Math.max(start,Number(document.getElementById("splitEnd")?.value)||start);
if(typeof PDFLib==="undefined"){result.innerText="PDF library is loading. Refresh and try again.";return;}
try{
let src=await PDFLib.PDFDocument.load(await file.arrayBuffer()),count=src.getPageCount();
if(start>count){result.innerText="Start page is beyond the PDF page count ("+count+").";return;}
end=Math.min(end,count);
let indexes=[];for(let i=start-1;i<end;i++)indexes.push(i);
let out=await PDFLib.PDFDocument.create(),pages=await out.copyPages(src,indexes);
pages.forEach(p=>out.addPage(p));
let bytes=await out.save();downloadBlob(new Blob([bytes],{type:"application/pdf"}),"SandyTools-Pages-"+start+"-"+end+".pdf");
result.innerText="Pages "+start+"–"+end+" extracted successfully. Download started.";
}catch(e){result.innerText="Could not split this PDF.";}
}
function makePassportPhoto(){
let file=document.getElementById("passportFile")?.files[0],result=document.getElementById("passportResult");
if(!file){result.innerText="Select a photo first.";return;}
let img=new Image(),reader=new FileReader();
reader.onload=function(e){img.onload=function(){
let canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");
canvas.width=413;canvas.height=531;
let ratio=Math.max(canvas.width/img.width,canvas.height/img.height),w=img.width*ratio,h=img.height*ratio;
ctx.drawImage(img,(canvas.width-w)/2,(canvas.height-h)/2,w,h);
canvas.toBlob(function(blob){downloadBlob(blob,"SandyTools-Passport-Photo.jpg");result.innerText="Passport-size photo created (413 × 531 px).";},"image/jpeg",.92);
};img.src=e.target.result;};reader.readAsDataURL(file);
}
function formatJSON(){
let input=document.getElementById("jsonInput")?.value.trim(),result=document.getElementById("jsonResult");
if(!input){result.innerText="Paste JSON first.";return;}
try{
let parsed=JSON.parse(input),pretty=JSON.stringify(parsed,null,2);
window.sandyFormattedJSON=pretty;
result.innerHTML="<pre style='white-space:pre-wrap;word-break:break-word;margin:0'>"+escapeHtml(pretty)+"</pre><br><button type='button' onclick='copyToolText("+JSON.stringify(pretty)+")'>Copy</button> <button type='button' onclick='downloadFormattedJSON()'>Download JSON</button>";
}catch(e){result.innerText="Invalid JSON: "+e.message;}
}
function downloadFormattedJSON(){
let text=window.sandyFormattedJSON||"";
if(!text)return;
downloadBlob(new Blob([text],{type:"application/json"}),"SandyTools-formatted.json");
}
function escapeHtml(s){return String(s).replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch]||ch;});}
function copyToolText(text){
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){alert("Copied to clipboard.");}).catch(function(){fallbackCopy(text);});}
else fallbackCopy(text);
}
function fallbackCopy(text){let t=document.createElement("textarea");t.value=text;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();alert("Copied to clipboard.");}
function addNewToolsSection(){}
document.addEventListener("DOMContentLoaded",addNewToolsSection);

/* SandyTools — Image & Video editing tools */
async function removeImageBackground(){
let file=document.getElementById("bgRemoveFile")?.files[0],result=document.getElementById("bgRemoveResult");
if(!file){result.innerText="Select an image first.";return;}
result.innerText="Loading background-removal model… first run can take longer.";
try{
let mod=await import("https://cdn.jsdelivr.net/npm/@imgly/background-removal/+esm");
let blob=await mod.removeBackground(file,{model:"isnet_quint8",output:{format:"image/png",quality:0.9}});
showDownloadButton(result,blob,"SandyTools-Background-Removed.png","Background removed successfully.");
}catch(e){
result.innerText="Background removal could not start. Try a modern browser and allow the model to load.";
}
}
function getVideoDuration(file,video){
return new Promise(function(resolve,reject){
video.preload="metadata";
video.onloadedmetadata=function(){URL.revokeObjectURL(video.src);resolve(video.duration);};
video.onerror=function(){URL.revokeObjectURL(video.src);reject(new Error("video"));};
video.src=URL.createObjectURL(file);
});
}
async function recordVideoBrowser(file,start,end,maxWidth){
let video=document.createElement("video");
video.muted=false;video.playsInline=true;video.preload="auto";
let duration=await getVideoDuration(file,video);
if(!isFinite(duration)||duration<=0)throw new Error("duration");
start=Math.max(0,Math.min(start,duration));
end=Math.max(start+0.1,Math.min(end,duration));
let waitSeek=function(){
return new Promise(function(resolve,reject){
video.onseeked=function(){resolve();};
video.onerror=reject;
video.currentTime=start;
});
};
await waitSeek();
let scale=Math.min(1,maxWidth/video.videoWidth);
let w=Math.max(2,Math.round(video.videoWidth*scale)),h=Math.max(2,Math.round(video.videoHeight*scale));
let canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;
let ctx=canvas.getContext("2d");
let canvasStream=canvas.captureStream(30);
let sourceStream=video.captureStream?video.captureStream():null;
if(sourceStream)sourceStream.getAudioTracks().forEach(function(t){canvasStream.addTrack(t);});
let mime="video/webm;codecs=vp8,opus";
if(!MediaRecorder.isTypeSupported(mime))mime="video/webm";
let chunks=[],rec=new MediaRecorder(canvasStream,{mimeType:mime,videoBitsPerSecond:1600000});
let finished=new Promise(function(resolve,reject){
rec.ondataavailable=function(e){if(e.data.size)chunks.push(e.data);};
rec.onerror=function(){reject(rec.error||new Error("recording"));};
rec.onstop=function(){resolve(new Blob(chunks,{type:mime}));};
});
let draw=function(){
if(video.currentTime>=end||video.ended){if(rec.state!=="inactive")rec.stop();return;}
ctx.drawImage(video,0,0,w,h);requestAnimationFrame(draw);
};
rec.start(250);await video.play();draw();
return await finished;
}
async function compressVideoBrowser(){
let file=document.getElementById("compressVideoFile")?.files[0],result=document.getElementById("compressVideoResult");
if(!file){result.innerText="Select a video first.";return;}
if(!window.MediaRecorder||!HTMLCanvasElement.prototype.captureStream){result.innerText="Video compression is not supported in this browser.";return;}
result.innerText="Compressing video in your browser… keep this page open.";
try{
let video=document.createElement("video"),duration=await getVideoDuration(file,video);
let blob=await recordVideoBrowser(file,0,duration,1280);
downloadBlob(blob,"SandyTools-Compressed-Video.webm");
result.innerText="Video compressed successfully. Output: WebM ("+(blob.size/1024/1024).toFixed(2)+" MB).";
}catch(e){result.innerText="Could not compress this video. Try a shorter/smaller video.";}}
async function trimVideoBrowser(){
let file=document.getElementById("trimVideoFile")?.files[0],result=document.getElementById("trimVideoResult");
let start=Math.max(0,Number(document.getElementById("trimStart")?.value)||0),end=Number(document.getElementById("trimEnd")?.value);
if(!file){result.innerText="Select a video first.";return;}
if(!window.MediaRecorder||!HTMLCanvasElement.prototype.captureStream){result.innerText="Video trimming is not supported in this browser.";return;}
result.innerText="Trimming video in your browser… keep this page open.";
try{
let video=document.createElement("video"),duration=await getVideoDuration(file,video);
if(!isFinite(end)||end<=start)end=duration;
if(start>=duration||end<=start){result.innerText="Enter a valid start/end time.";return;}
let blob=await recordVideoBrowser(file,start,end,1920);
downloadBlob(blob,"SandyTools-Trimmed-Video.webm");
result.innerText="Video trimmed successfully. Output: WebM ("+(blob.size/1024/1024).toFixed(2)+" MB).";
}catch(e){result.innerText="Could not trim this video. Try a shorter/smaller video.";}}
function addMediaToolsSection(){
if(!document.body||document.getElementById("media-editing-tools"))return;
let main=document.querySelector("main");if(!main)return;
let sec=document.createElement("section");sec.className="tool-section";sec.id="media-editing-tools";
sec.innerHTML='<div class="section-heading"><div><span class="section-kicker">07</span><h2>Image & Video Editing</h2></div><p>Popular browser-based editing tools.</p></div><div class="tool-grid">'+
'<div class="tool-box" data-name="background remover remove background image editing ai"><div class="tool-icon">BG</div><div class="tool-info"><h3>Background Remover</h3><p>AI background removal directly in your browser.</p><button onclick="openTool(\'bgRemover\')">Open</button></div><div id="bgRemover" class="tool-panel"><input type="file" id="bgRemoveFile" accept="image/*"><button onclick="removeImageBackground()">Remove Background</button><div id="bgRemoveResult" class="result">Select an image first.</div></div></div>'+
'<div class="tool-box" data-name="image converter jpg png webp convert image editing"><div class="tool-icon">IMG</div><div class="tool-info"><h3>Image Converter</h3><p>Convert images to JPG, PNG or WebP.</p><button onclick="openTool(\'imageConverter\')">Open</button></div><div id="imageConverter" class="tool-panel"><input type="file" id="convertImageFile" accept="image/*"><select id="convertImageType"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select><button onclick="convertImageFile()">Convert Image</button><div id="convertImageResult" class="result">Select an image first.</div></div></div>'+
'<div class="tool-box" data-name="video compressor compress video editing"><div class="tool-icon">VID</div><div class="tool-info"><h3>Video Compressor</h3><p>Reduce video resolution and bitrate in your browser.</p><button onclick="openTool(\'videoCompressor\')">Open</button></div><div id="videoCompressor" class="tool-panel"><input type="file" id="compressVideoFile" accept="video/*"><button onclick="compressVideoBrowser()">Compress Video</button><div id="compressVideoResult" class="result">Select a video first.</div></div></div>'+
'<div class="tool-box" data-name="video trimmer trim video editing"><div class="tool-icon">CUT</div><div class="tool-info"><h3>Video Trimmer</h3><p>Cut the start and end of a video quickly.</p><button onclick="openTool(\'videoTrimmer\')">Open</button></div><div id="videoTrimmer" class="tool-panel"><input type="file" id="trimVideoFile" accept="video/*"><input type="number" id="trimStart" min="0" step="0.1" placeholder="Start seconds"><input type="number" id="trimEnd" min="0" step="0.1" placeholder="End seconds"><button onclick="trimVideoBrowser()">Trim Video</button><div id="trimVideoResult" class="result">Select a video first.</div></div></div>'+
'</div>';const anchor=document.querySelector(".compact-info") || document.querySelector(".seo-details") || null;\nif(anchor) main.insertBefore(sec,anchor); else main.appendChild(sec);
}
function convertImageFile(){
let file=document.getElementById("convertImageFile")?.files[0],type=document.getElementById("convertImageType")?.value,result=document.getElementById("convertImageResult");
if(!file){result.innerText="Select an image first.";return;}
let img=new Image(),reader=new FileReader();
reader.onload=function(e){img.onload=function(){
let canvas=document.createElement("canvas");canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
canvas.getContext("2d").drawImage(img,0,0);
canvas.toBlob(function(blob){if(!blob){result.innerText="Conversion failed.";return;}let ext=type==="image/png"?"png":type==="image/webp"?"webp":"jpg";showDownloadButton(result,blob,"SandyTools-Converted."+ext,"Image converted to "+ext.toUpperCase()+" successfully.");},type,0.92);
};img.src=e.target.result;};reader.readAsDataURL(file);
}
document.addEventListener("DOMContentLoaded",addMediaToolsSection);
