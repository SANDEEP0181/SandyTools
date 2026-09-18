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
function generatePassword(){let n=Number(document.getElementById("passwordLength").value)||16,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",p="";for(let i=0;i<n;i++)p+=c[Math.floor(Math.random()*c.length)];document.getElementById("passwordResult").innerText=p;}
function compressImageFile(){
let file=document.getElementById("compressImage").files[0];
let result=document.getElementById("compressResult");
if(!file){result.innerText="Select an image first.";return;}
let img=new Image();
let reader=new FileReader();
reader.onload=function(e){
img.onload=function(){
let canvas=document.createElement("canvas");
canvas.width=img.width;
canvas.height=img.height;
let ctx=canvas.getContext("2d");
ctx.drawImage(img,0,0);
let quality=Number(document.getElementById("compressQuality").value)/100;
let outputType=file.type==="image/png"?"image/png":"image/jpeg";
canvas.toBlob(function(blob){
let url=URL.createObjectURL(blob);
let oldSize=(file.size/1024).toFixed(1);
let newSize=(blob.size/1024).toFixed(1);
result.innerHTML="Original: "+oldSize+" KB | Compressed: "+newSize+" KB<br><a href='" + url + "' download='compressed-image.jpg'>Download Compressed Image</a>";
},outputType,quality);
};
img.src=e.target.result;
};
reader.readAsDataURL(file);
}
function resizeImageFile(){
let file=document.getElementById("resizeImage").files[0];
let width=Number(document.getElementById("resizeWidth").value);
let height=Number(document.getElementById("resizeHeight").value);
let result=document.getElementById("resizeResult");
if(!file){result.innerText="Select an image first.";return;}
if(!width||!height||width<1||height<1){result.innerText="Enter valid width and height.";return;}
let img=new Image();
let reader=new FileReader();
reader.onload=function(e){
img.onload=function(){
let canvas=document.createElement("canvas");
canvas.width=width;
canvas.height=height;
let ctx=canvas.getContext("2d");
ctx.drawImage(img,0,0,width,height);
canvas.toBlob(function(blob){
let url=URL.createObjectURL(blob);
result.innerHTML="New Size: "+width+" x "+height+" px<br><a href='" + url + "' download='resized-image.jpg'>Download Resized Image</a>";
}, "image/jpeg", 0.90);
};
img.src=e.target.result;
};
reader.readAsDataURL(file);
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
