const form = document.getElementById("form")
const input = document.getElementById("input");
const inputres = document.getElementById("input_res");
const h1 = document.getElementById("h1");
const boton = document.getElementById("boton")
const buttonPause = document.getElementById("pause")
const buttonStart = document.getElementById("start")
const stopPomodoro = document.getElementById("advise")
const buttonPause__rest = document.getElementById("pauseRest");
const openModal = document.getElementById("setting")
const closeModal = document.getElementById("close_modal")
const modalMenu = document.getElementById("modal_active")
const modalBlock = document.getElementById("modal_block")

form.addEventListener("click", (e)=>{
    e.preventDefault()
})
let bellSound__One= new Audio();
let bellSound__Second= new Audio();
bellSound__One.src= "./assets/sounds/bell_alert_start.wav";
bellSound__Second.src= "./assets/sounds/bell_alert_end.wav";


closeModal.addEventListener("click", ()=>{
    modalMenu.classList.add("hidden")
})


boton.addEventListener("click", ()=>{
    let countNumber = input.value * 60;
    let resNumber = inputres.value * 60;
    modalMenu.classList.add("hidden")
    modalBlock.classList.add("hidden")
    startCountDown(countNumber,resNumber)    
})

function timeShow(sec){
    const minute = Math.floor(sec / 60)
    const second = Math.floor(sec % 60)
    h1.innerHTML = `${minute<10 ? "0": ""}${minute}:${second<10 ? "0": ""}${second}`
}

let signalRest = 0;
let help=0;
let contHelp=0;

openModal.addEventListener("click", ()=>{
    modalMenu.classList.toggle("hidden")
})


function startCountDown (sec,restime){
    let root = document.documentElement;
    let copy=sec;
    contHelp+=1;
    buttonPause.classList.remove("hidden")
    buttonPause__rest.classList.add("hidden")
    const countDown = setInterval (()=>{
        if(signalRest==0){
            modalBlock.classList.remove("hidden")
            boton.classList.add("hidden")
            signalRest=0;
        }else{
            signalRest=1;
            modalBlock.classList.add("hidden")
            boton.classList.remove("hidden")
        }
        sec--;
        boton.classList.add("hidden")
        modalBlock.classList.remove("hidden")
        let helpOne=(100*sec)/copy;
        let helpTwo=100-helpOne;
        root.style.setProperty("--bar-length", helpTwo + "%")
        console.log(helpTwo)
        help=sec;
        timeShow(sec)
        if(sec<=0){
            boton.classList.remove("hidden")
            modalBlock.classList.add("hidden")
            clearInterval(countDown)
            clockRest(restime,copy)
            bellSound__One.play();
        }
    },1000)

    stopPomodoro.addEventListener("click",()=>{
        modalBlock.classList.add("hidden")
        boton.classList.remove("hidden")
        clearInterval(countDown)
        signalRest = 1;
    })

    let cont=0;
    buttonPause.addEventListener("click", ()=>{
        cont+=1;
        clearInterval(countDown)
        buttonPause.textContent="Start"
        if(cont==2){
            console.log(restime)
            startCountDown(help,restime)
            cont=0;
            buttonPause.textContent="Pause"
        }
    })
}



function clockRest(restime,sec){
    buttonPause.classList.add("hidden")
    buttonPause__rest.classList.remove("hidden")
    
    let root = document.documentElement;
    let copy=restime;
    console.log("soy sec", sec)
    const clockRest__ = setInterval(() => {
        if(signalRest==1){
            clearInterval(clockRest__)
            signalRest = 0;
        }
        boton.classList.add("hidden")
        modalBlock.classList.remove("hidden")
        restime--;
        help=restime;
        let helpOne=(100*restime)/copy;
        let helpTwo=100-helpOne;
        root.style.setProperty("--bar-length", helpTwo + "%")
        console.log(helpTwo)
        timeShow(restime)
        if(restime<=0){
            boton.classList.remove("hidden")
            modalBlock.classList.add("hidden")
            clearInterval(clockRest__)
            bellSound__Second.play();
            buttonPause.classList.remove("hidden")
            buttonPause__rest.classList.add("hidden")
        }
    }, 1000);

    stopPomodoro.addEventListener("click",()=>{
        clearInterval(clockRest__)
        signalRest = 1;
    })

    let cont=0;
    buttonPause__rest.addEventListener("click", ()=>{
        cont+=1;
        clearInterval(clockRest__)
        buttonPause__rest.textContent="Start"
        if(cont==2){
            clockRest(help,restime)
            cont=0;
            buttonPause__rest.textContent="Pause"
        }
    })

}