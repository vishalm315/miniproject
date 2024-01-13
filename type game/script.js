const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "A journey of a thousand miles begins with a single step.",
  "Time is the wisest counselor of all.",
  "Happiness depends upon ourselves.",
  "In the middle of difficulty lies opportunity.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "Be yourself; everyone else is already taken."
];

const typingText=document.querySelector(".text-box p"),
inpField=document.querySelector(".container .input-field"),
mistakeTag=document.querySelector(".mistake span"),
timerTag=document.querySelector(".timer span"),
cpmTag=document.querySelector(".cpm span"),
wpmTag=document.querySelector(".wpm span")
tryAgainBtn=document.querySelector(".button-tryagain")
let charIndex=mistakes=isTyping=0;
let timer,maxTime=10,timeLeft=maxTime

function randomParagraph(){
  let randIndex=Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML="";
  paragraphs[randIndex].split("").forEach(span=>{
    let spanTag=`<span>${span}</span>`;
    typingText.innerHTML+=spanTag;
  });

 document.addEventListener("keydown",()=>inpField.focus());
 typingText.addEventListener("click",()=>inpField.focus());
} 

function initTyping(){
  const characters=typingText.querySelectorAll("span");
  let typedChar=inpField.value.split("")[charIndex];
 if(charIndex<characters.length-1 && timeLeft>0){
  if(!isTyping){
    let timer=setInterval(initTimer,1000);
    isTyping=true;
  }
  
  if(typedChar==null){
    characters[charIndex].classList.remove("correct","incorrect");
    charIndex--;
    if(characters[charIndex].classList.contains("incorrect")){
      mistakes--;
    }
  }
  else{
    if(characters[charIndex].innerText===typedChar){
      characters[charIndex].classList.add("correct");
    }
    else{
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }
  
  characters.forEach(span=>span.classList.remove("active"));
  characters[charIndex].classList.add("active");
  let wpm=Math.round((((charIndex-mistakes)/5)/(maxTime-timeLeft))*60);
  wpm=wpm<0 || !wpm || wpm===Infinity ? 0:wpm;
  mistakeTag.innerText=mistakes;
  cpmTag.innerText=charIndex-mistakes;
  wpmTag.innerText=wpm;

 }
 else{
  inpField.value="";
  clearInterval(timer);
 }
}

function initTimer(){
  if(timeLeft>0){
    timeLeft--;
    timerTag.innerText=timeLeft;
  }
  else{
    clearInterval(timer)
  }
}

function resetGame(){
  randomParagraph();
  inpField.value=""
  clearInterval(timer)
  charIndex=typingText=mistakes=0;
  timeLeft=maxTime;
  timerTag.innerText=timeLeft;
  mistakeTag.innerText=mistakes;
  cpmTag.innerText=0;
  wpmTag.innerText=0;
}
randomParagraph();
inpField.addEventListener("input",initTyping)
tryAgainBtn.addEventListener("click",resetGame)