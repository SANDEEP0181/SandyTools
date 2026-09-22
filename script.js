/* SandyTools stable v2 - universal buttons */
(function(){
"use strict";

function $(id){return document.getElementById(id);}
function result(id,msg){var el=$(id);if(el)el.textContent=msg;return el;}
window.openTool=function(id){
  var panel=$(id);
  if(!panel)return;
  document.querySelectorAll(".tool-panel").forEach(function(p){p.style.display="none";});
  panel.style.display="block";
  var box=panel.closest(".tool-box");
  if(box)box.classList.add("tool-open");
  setTimeout(function(){panel.scrollIntoView({behavior:"smooth",block:"nearest"});},20);
};

function downloadBlob(blob,name){
  var a=document.createElement("a"),url=URL.createObjectURL(blob);
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(url);},1000);
}
window.downloadBlob=downloadBlob;

function setup(){
  var templates={
    percentage:'<input id="percentValue" type="number" placeholder="Value"><input id="percentTotal" type="number" placeholder="Total"><button type="button" onclick="calculatePercentage()">Calculate</button><div id="percentResult" class="result"></div>',
    age:'<input id="birthDate" type="date"><button type="button" onclick="calculateAge()">Calculate Age</button><div id="ageResult" class="result"></div>',
    emi:'<input id="loanAmount" type="number" placeholder="Loan Amount"><input id="interestRate" type="number" placeholder="Annual Interest %"><input id="loanYears" type="number" placeholder="Loan Years"><button type="button" onclick="calculateEMI()">Calculate EMI</button><div id="emiResult" class="result"></div>',
    gst:'<input id="gstAmount" type="number" placeholder="Amount"><input id="gstRate" type="number" placeholder="GST %"><button type="button" onclick="calculateGST()">Calculate GST</button><div id="gstResult" class="result"></div>',
    sip:'<input id="sipMonthly" type="number" placeholder="Monthly Investment"><input id="sipRate" type="number" placeholder="Expected Return %"><input id="sipYears" type="number" placeholder="Years"><button type="button" onclick="calculateSIP()">Calculate SIP</button><div id="sipResult" class="result"></div>',
    discount:'<input id="discountPrice" type="number" placeholder="Original Price"><input id="discountRate" type="number" placeholder="Discount %"><button type="button" onclick="calculateDiscount()">Calculate Discount</button><div id="discountResult" class="result"></div>',
    title:'<input id="titleTopic" placeholder="Enter video topic"><button type="button" onclick="generateTitle()">Generate Title</button><div id="titleResult" class="result"></div>',
    description:'<input id="descriptionTopic" placeholder="Enter video topic"><button type="button" onclick="generateDescription()">Generate Description</button><div id="descriptionResult" class="result"></div>',
    hashtags:'<input id="hashtagTopic" placeholder="Enter topic"><button type="button" onclick="generateHashtags()">Generate Hashtags</button><div id="hashtagResult" class="result"></div>',
    words:'<textarea id="wordText" rows="4" placeholder="Type or paste text"></textarea><button type="button" onclick="countWords()">Count Words</button><div id="wordResult" class="result"></div>',
    characters:'<textarea id="characterText" rows="4" placeholder="Type or paste text"></textarea><button type="button" onclick="countCharacters()">Count Characters</button><div id="characterResult" class="result"></div>',
    case:'<textarea id="caseText" rows="4" placeholder="Enter text"></textarea><button type="button" onclick="toUpperCaseText()">UPPERCASE</button><button type="button" onclick="toLowerCaseText()">lowercase</button><div id="caseResult" class="result"></div>',
    date:'<input id="dateOne" type="date"><input id="dateTwo" type="date"><button type="button" onclick="dateDifference()">Calculate Difference</button><div id="dateResult" class="result"></div>',
    time:'<input id="timeOne" type="time"><input id="timeTwo" type="time"><button type="button" onclick="calculateTime()">Calculate Difference</button><div id="timeResult" class="result"></div>',
    unit:'<input id="unitValue" type="number" placeholder="Enter value"><select id="unitType"><option value="kmm">Kilometers to Miles</option><option value="mikm">Miles to Kilometers</option><option value="kgp">Kilograms to Pounds</option><option value="lbkg">Pounds to Kilograms</option><option value="cmft">Centimeters to Feet</option><option value="ftcm">Feet to Centimeters</option></select><button type="button" onclick="convertUnit()">Convert</button><div id="unitResult" class="result"></div>',
    password:'<input id="passwordLength" type="number" value="16" min="4" max="100"><button type="button" onclick="generatePassword()">Generate Password</button><div id="passwordResult" class="result"></div>',
    imageCompressor:'<input type="file" id="compressImage" accept="image/*"><label>Quality: <span id="qualityValue">70</span>%</label><input type="range" id="compressQuality" min="10" max="100" value="70"><button type="button" onclick="compressImageFile()">Compress Image</button><div id="compressResult" class="result">Select an image first.</div>',
    imageResizer:'<input type="file" id="resizeImage" accept="image/*"><input type="number" id="resizeWidth" placeholder="Width in pixels"><input type="number" id="resizeHeight" placeholder="Height in pixels"><label><input type="checkbox" id="keepRatio" checked> Keep ratio</label><button type="button" onclick="resizeImageFile()">Resize Image</button><div id="resizeResult" class="result">Select an image first.</div>',
    qrGenerator:'<input type="text" id="qrText" placeholder="Enter text or website URL"><button type="button" onclick="generateQR()">Generate QR Code</button><div id="qrResult" class="result">Enter text or URL first.</div>',
    pdfMerger:'<input type="file" id="pdfFiles" accept=".pdf,application/pdf" multiple><button type="button" onclick="mergePDFs()">Merge PDF Files</button><div id="pdfResult" class="result">Select two or more PDF files.</div>'
  };
  document.querySelectorAll(".tool-panel").forEach(function(p){if(templates[p.id])p.innerHTML=templates[p.id];});
  var q=$("compressQuality");if(q)q.oninput=function(){var v=$("qualityValue");if(v)v.textContent=this.value;};
}

window.calculatePercentage=function(){var v=Number($("percentValue").value),t=Number($("percentTotal").value);result("percentResult",t?"Result: "+((v/t)*100).toFixed(2)+"%":"Enter valid values");};
window.calculateAge=function(){var d=new Date($("birthDate").value),n=new Date();if(isNaN(d)){result("ageResult","Select birth date");return;}var a=n.getFullYear()-d.getFullYear(),m=n.getMonth()-d.getMonth();if(m<0||(m===0&&n.getDate()<d.getDate()))a--;result("ageResult","Age: "+a+" years");};
window.calculateEMI=function(){var P=Number($("loanAmount").value),annual=Number($("interestRate").value),years=Number($("loanYears").value);if(!P||!years){result("emiResult","Enter valid values");return;}var r=annual/1200,n=years*12,emi=r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n;result("emiResult","Monthly EMI: Rs "+emi.toFixed(2));};
window.calculateGST=function(){var a=Number($("gstAmount").value),r=Number($("gstRate").value),g=a*r/100;result("gstResult","GST: Rs "+g.toFixed(2)+" | Total: Rs "+(a+g).toFixed(2));};
window.calculateSIP=function(){var p=Number($("sipMonthly").value),rate=Number($("sipRate").value),years=Number($("sipYears").value),n=years*12,r=rate/1200,f=r?p*((Math.pow(1+r,n)-1)/r)*(1+r):p*n;result("sipResult","Estimated Value: Rs "+f.toFixed(2));};
window.calculateDiscount=function(){var p=Number($("discountPrice").value),r=Number($("discountRate").value),d=p*r/100;result("discountResult","Discount: Rs "+d.toFixed(2)+" | Final Price: Rs "+(p-d).toFixed(2));};
window.generateTitle=function(){var t=$("titleTopic").value.trim();result("titleResult",t?"Amazing "+t+" - Watch Till The End":"Enter a topic first");};
window.generateDescription=function(){var t=$("descriptionTopic").value.trim();result("descriptionResult",t?"Welcome to our video about "+t+". Watch till the end and subscribe for more videos.":"Enter a topic first");};
window.generateHashtags=function(){var t=$("hashtagTopic").value.trim();result("hashtagResult",t?t.split(/\s+/).map(function(w){return "#"+w.replace(/[^a-zA-Z0-9]/g,"");}).join(" ")+" #YouTube #Trending #Viral":"Enter a topic first");};
window.countWords=function(){var t=$("wordText").value.trim();result("wordResult","Words: "+(t?t.split(/\s+/).length:0));};
window.countCharacters=function(){result("characterResult","Characters: "+$("characterText").value.length);};
window.toUpperCaseText=function(){result("caseResult",$("caseText").value.toUpperCase());};
window.toLowerCaseText=function(){result("caseResult",$("caseText").value.toLowerCase());};
window.dateDifference=function(){var a=new Date($("dateOne").value),b=new Date($("dateTwo").value);result("dateResult",isNaN(a)||isNaN(b)?"Select both dates":"Difference: "+Math.abs(Math.round((b-a)/86400000))+" days");};
window.calculateTime=function(){var a=$("timeOne").value,b=$("timeTwo").value;if(!a||!b){result("timeResult","Select both times");return;}var x=a.split(":").map(Number),y=b.split(":").map(Number),d=Math.abs((y[0]*60+y[1])-(x[0]*60+x[1]));result("timeResult","Difference: "+Math.floor(d/60)+" hours "+d%60+" minutes");};
window.convertUnit=function(){var v=Number($("unitValue").value),t=$("unitType").value,r={kmm:.621371,mikm:1.60934,kgp:2.20462,lbkg:.453592,cmft:.0328084,ftcm:30.48}[t]||0;result("unitResult","Result: "+(v*r).toFixed(4));};
window.generatePassword=function(){var n=Math.min(100,Math.max(4,Number($("passwordLength").value)||16)),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-+=?",p="";for(var i=0;i<n;i++)p+=c[Math.floor(Math.random()*c.length)];$("passwordResult").innerHTML="<strong>"+p+"</strong><br><button type='button' onclick='copyToolText("+JSON.stringify(p)+")'>Copy Password</button>";};
window.copyToolText=function(t){if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){alert("Copied.");}).catch(function(){fallbackCopy(t);});else fallbackCopy(t);};
function fallbackCopy(t){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();alert("Copied.");}

function imageFromFile(id,cb){var f=$(id)?.files[0];if(!f){cb(null);return;}var r=new FileReader();r.onload=function(e){var img=new Image();img.onload=function(){cb(img,f);};img.src=e.target.result;};r.readAsDataURL(f);}
window.compressImageFile=function(){imageFromFile("compressImage",function(img,f){if(!img){result("compressResult","Select an image first.");return;}var q=(Number($("compressQuality").value)||70)/100,c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext("2d").drawImage(img,0,0);c.toBlob(function(b){if(!b){result("compressResult","Compression failed.");return;}downloadBlob(b,"SandyTools-Compressed.jpg");result("compressResult","Compression complete. Download started.");},"image/jpeg",q);});};
window.resizeImageFile=function(){imageFromFile("resizeImage",function(img){var w=Number($("resizeWidth").value),h=Number($("resizeHeight").value);if(!img){result("resizeResult","Select an image first.");return;}if(!w){result("resizeResult","Enter a valid width.");return;}if($("keepRatio").checked)h=Math.round(w*img.naturalHeight/img.naturalWidth);if(!h){result("resizeResult","Enter a valid height.");return;}var c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);c.toBlob(function(b){downloadBlob(b,"SandyTools-Resized.jpg");result("resizeResult","Resized to "+w+" × "+h+" px. Download started.");},"image/jpeg",.92);});};
window.generateQR=function(){var t=$("qrText").value.trim();if(!t){result("qrResult","Enter text or URL first.");return;}var u="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+encodeURIComponent(t);$("qrResult").innerHTML="<img src='"+u+"' alt='QR Code' style='max-width:300px;width:100%'><br><a class='download-btn' href='"+u+"' target='_blank' download='SandyTools-QR.png'>Download QR Code</a>";};

window.mergePDFs=async function(){var f=$("pdfFiles")?.files;if(!f||f.length<2){result("pdfResult","Select at least two PDF files.");return;}if(!window.PDFLib){result("pdfResult","PDF library is loading. Refresh once and try again.");return;}try{var out=await PDFLib.PDFDocument.create();for(var file of f){var pdf=await PDFLib.PDFDocument.load(await file.arrayBuffer());(await out.copyPages(pdf,pdf.getPageIndices())).forEach(function(p){out.addPage(p);});}downloadBlob(new Blob([await out.save()],{type:"application/pdf"}),"SandyTools-Merged.pdf");result("pdfResult",f.length+" PDF files merged. Download started.");}catch(e){result("pdfResult","Could not merge PDF files.");}};

window.openExistingTool=function(id){window.openTool(id);};

document.addEventListener("DOMContentLoaded",function(){
  setup();
  var s=$("searchTools");if(s)s.addEventListener("input",function(){var q=this.value.toLowerCase();document.querySelectorAll(".tool-box").forEach(function(b){b.classList.toggle("hidden",!q||((b.dataset.name||"").toLowerCase().indexOf(q)>=0));});});
  document.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;
    if(b.getAttribute("onclick"))return;
    var box=b.closest(".tool-box"),panel=box&&box.querySelector(".tool-panel");
    if(b.textContent.trim().toLowerCase()==="open"&&panel)window.openTool(panel.id);
  });
});
})();