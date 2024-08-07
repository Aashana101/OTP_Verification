const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");
const step3 = document.querySelector(".step3");
emailAddress=document.getElementById("emailAddress");
verifyEmail=document.getElementById("verifyEmail");
inputs=document.querySelectorAll(".otp-group input");
nextbutton=document.querySelector(".nextButton");
verifyButton=document.querySelector(".verifyButton");
let OTP="";
window.addEventListener("load", ()=>{
    emailjs.init("pBD9sAeEITMfAttjZ");
    step2.style.display="none";
    step3.style.display = "none";
     nextbutton.classList.add("disable");
     verifyButton.classList.add("disable");
});
const validateEmail=(email)=>{
    let re = /\S+@\S+\.\S/;
    if(re.test(email)){
        nextbutton.classList.remove("disable");
    }
    else {
        nextbutton.classList.add("disable");

    }
};
const generateOTP=()=>{
    return Math.floor(1000+Math.random()*9000);
};
inputs.forEach((input) => {
    input.addEventListener("keyup", function(e){
        if(this.value.length>=1)
            e.target.value=e.target.value.substr(0,1);
        if(inputs[0].value!="" && inputs[1].value!="" && inputs[2].value!="" && inputs[3].value!=""){
            verifyButton.classList.remove("disable");
        }
        else{
            verifyButton.classList.add("disable");
        }
    });
});
const serviceID = "service_hglg6gl";
const templateID = "template_antv0ns";
nextbutton.addEventListener("click", ()=>{
    OTP=generateOTP(); 
    nextbutton.innerHTML="&#9889; Sending...";
    let templateParameter = {
      from_name: "Aashana Sharma's Community",
      OTP:OTP,
      message: "Please find out the attached File",
      reply_to:emailAddress.value,
    };
    emailjs.send(serviceID, templateID, templateParameter)
    .then((res)=>{
        console.log(res);
        nextbutton.innerHTML="Next &rarr;";
        step1.style.display="none";
        step2.style.display = "block";


    },
    (err)=>{
        console.log(err);
    });

});
verifyButton.addEventListener("click",()=>{
    let values="";
    inputs.forEach((input)=>{
        values+=input.value;
    });
    if (OTP == values){
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "block";
    }
    else{
            verifyButton.classList.add("error-shake");
   
    }
    
});

function changeMyEmail(){
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
    emailAddress.value="";
}