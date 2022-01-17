//Guess the number

const randomNumber = (Math.floor(Math.random() * 100)) + 1;
let transcript = '';
console.log(randomNumber);

//speechRecognition

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
// recognition.continuous = true;
// recognition.interimResults = true;


//start recognition and the game
recognition.start();
  
//display msg on start
recognition.onstart = () => {
 
    console.log("we are listening, try to speak in the microphone");
}

//Capture what user speaks

recognition.onresult = function (event) {
    // for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript = event.results[0][0].transcript;
      console.log(transcript);

      //check if the number is valid and between 1-100
      if(Number(isNaN(transcript)))
      {
          document.getElementById("result").innerText = "Please speak a valid number";
         
      }
      else if(transcript>100 || transcript<0)
      {
          document.getElementById("result").innerText = "please speak a number between 1-100";
      }
      else if (transcript > randomNumber ) {
          document.getElementById("result").innerText = "Go a little lower";
      
         
      } else if (transcript < randomNumber) {
          document.getElementById("result").innerText = "Go a little higher";
        
      }
      else if(transcript==randomNumber)
      {
          document.getElementById("result").innerText = "Congratulations! You've won the game"
          document.getElementById("playExit").style.display="flex";
      }
    }


//Ending Speech Recognition service

recognition.addEventListener("end",()=>{
    if(transcript!=randomNumber)
       {
           recognition.start();
       }
})

//events associated with play and exit buttons

document.getElementById("play").addEventListener("click",()=>{
    window.location.reload();
});

document.getElementById("exit").addEventListener("click",()=>{
    const result= window.confirm("Are you sure you're not up for another game ?");
    if(result)
       window.close();   
})