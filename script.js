const ADMIN_EMAIL="ashirfakhir@gmail.com";
const SCRIPT_URL="https://script.google.com/macros/s/AKfycby1z9Xlm7WG0Z9zPauiFIvgA8rKJ38IBq--tI6dOQFUP144qFc4obenevHVyYCecg6wwg/exec";
const SESSION_KEY="courseUser";
const SESSION_TIME_KEY="lastActivity";
const MAX_INACTIVE_TIME=60*60*1000;

/* USER IP GET */

async function getUserIP(){
try{
const res=await fetch("https://api.ipify.org?format=json");
const data=await res.json();
return data.ip;
}catch(e){
return "unknown";
}
}

/* GOOGLE LOGIN */

window.handleCredentialResponse=async function(response){

const data=JSON.parse(atob(response.credential.split('.')[1]));

const email=data.email;
const name=data.name;

const ip=await getUserIP();

fetch(SCRIPT_URL+"?email="+encodeURIComponent(email)+"&ip="+ip)

.then(res=>res.text())

.then(result=>{

if(result.trim().toLowerCase()==="allowed"){

localStorage.setItem(SESSION_KEY,email);
localStorage.setItem("userName",name);
localStorage.setItem(SESSION_TIME_KEY,Date.now());

showLessons();

if(email===ADMIN_EMAIL){
showAdminStats();
}

}else{

loginBox.style.display="none";
denied.style.display="block";

}

});

};

/* SHOW LESSONS */

function showLessons(){

loginBox.style.display="none";
denied.style.display="none";
lessons.style.display="block";

document.getElementById("welcomeUser").innerHTML=
"Welcome "+localStorage.getItem("userName");

/* banner popup */

setTimeout(showBannerPopup,1500);

}

/* ADMIN STATS */

function showAdminStats(){

fetch(SCRIPT_URL+"?admin=1")

.then(res=>res.json())

.then(data=>{

const box=document.getElementById("adminStats");

box.style.display="block";

box.innerHTML=`

<div style="background:#fff3cd;padding:20px;border-radius:12px;font-family:'Noto Nastaliq Urdu',serif;direction:rtl;text-align:right;">

<h3>📊 ایڈمن لاگ ان رپورٹ</h3>

<p><b>کل لاگ ان:</b> ${data.totalLogins}</p>

<p><b>منفرد صارفین:</b> ${data.uniqueUsers}</p>

</div>`;

});

}

/* VIDEO LOAD */

function loadVideo(element,fileId){

document.getElementById("mainVideo").src=
"https://drive.google.com/file/d/"+fileId+"/preview?embedded=true";

var items=document.querySelectorAll("#videoMenu li");

items.forEach(item=>item.classList.remove("active"));

element.classList.add("active");

element.scrollIntoView({behavior:'smooth',block:'center'});

const noteText=element.getAttribute('data-note');

document.getElementById('video-note').innerText=noteText;

}

/* PDF POPUP */

function openPDFPopup(fileId){

document.getElementById('pdfPopupFrame').src=
"https://drive.google.com/file/d/"+fileId+"/preview";

document.getElementById('pdfModal').style.display="flex";

}

function closePDFPopup(){

document.getElementById('pdfPopupFrame').src="";
document.getElementById('pdfModal').style.display="none";

}

/* VIDEO POPUP */

function openVideoPopup(videoId){

const embedUrl=`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1`;

document.getElementById('videoPopupFrame').src=embedUrl;

document.getElementById('videoModal').style.display="flex";

}

function closeVideoPopup(){

document.getElementById('videoPopupFrame').src="";

document.getElementById('videoModal').style.display="none";

}

/* ESC KEY CLOSE */

document.addEventListener('keydown',function(e){

if(e.key==="Escape"){
closeVideoPopup();
}

});

/* VIDEO GRID */

function loadVideoGrid(){

const videos=[

{id:"MWV9Nrq0V-M",title:"زوم کے ذریعے پڑھانے کا طریقہ"},
{id:"fTrFXPc9ymw",title:"پاکستان اور بیرون ممالک اشتہار چلانے میں فرق"},
{id:"nu4UKVILSe8",title:"انگلش میں اشتہارات بنانے کا طریقہ"},
{id:"EQptzURWSiY",title:"ٹیم پر اکاؤنٹ بنانے کا طریقہ"},
{id:"LTuHI2UMVWA",title:"موبائل پر ٹیم کے ذریعے پڑھانے کا طریقہ"},
{id:"CIg7hAhorZo",title:"لیپ ٹاپ یا کمپیوٹر اسکرین پر ٹیم کے ذریعے پڑھانے کا طریقہ"},
{id:"4OGc6msJ5cU",title:"فیس بک اشتہارات کے پیسے کیسے چیک کر سکتے ہیں"},
{id:"9VuMeqPBYoI",title:"فیس بک پیج کا نام تبدیل کرنے کا طریقہ"},
{id:"F74AOyHZAdI",title:"واٹس ایپ پر کمیونٹی گروپ بنانے کا طریقہ"},
{id:"gbsPtKsu35s",title:"فیس بک پیج کا ایڈمن بنانے کا طریقہ"},
{id:"n89Oly8yicE",title:"اسلام 360 کی پوسٹ شیئر کرنے کا طریقہ"}

];

const grid=document.getElementById('videoGrid');

grid.innerHTML='';

videos.forEach(video=>{

const item=document.createElement('div');

item.className='video-item';

item.innerHTML=`

<div class="video-thumb" onclick="openVideoPopup('${video.id}')">

<img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg">

<div class="play-icon">▶</div>

</div>

<div class="video-title">${video.title}</div>

`;

grid.appendChild(item);

});

}

/* PAGE LOAD */

window.addEventListener('load',function(){

loadVideoGrid();

});

/* BANNER POPUP */

function showBannerPopup(){

document.getElementById("bannerPopup").style.display="flex";

}

function closeBannerPopup(){

document.getElementById("bannerPopup").style.display="none";

document.getElementById("bannerFrame").src="";

}

function playBannerVideo(){

document.querySelector(".bannerVideo").style.display="none";

let frame=document.getElementById("bannerFrame");

frame.style.display="block";

frame.src="https://www.youtube.com/embed/CLiywvcy748?si=9Nsb1n1cxUqur9yS?autoplay=1";

}
