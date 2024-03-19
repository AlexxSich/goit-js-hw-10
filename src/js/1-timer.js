import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const pickDatetime = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const myCounter = document.querySelector(".timer");

pickDatetime.addEventListener("input", handleInput);
startBtn.addEventListener("click", btnHandleClick)
startBtn.disabled = true;
function handleInput(event){    
};

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });       
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};
flatpickr(pickDatetime, options)

// console.log(userSelectedDate)
// Вітаю Микола. Чи можете пояснити, щось підзабув, чому тут, рядок 38, я не можу побачити значення userSelectedDate через консоль, верніше чому воно показує undefined? На рядку 17 я його оголосив і вроді як на 31 рядку надав нове значення, але не зовсім розумію чому я його не бачу :). В середині функції я можу це перевірити але ззовні не виходить. Як можна зрозуміти, що значення записалося в змінну оголошену на 17 рядку? Дякую.


function btnHandleClick(event) {
  const repeatTime = setInterval(()=>{      
   const interval = userSelectedDate - new Date();
   if(interval < 1) {   
     clearInterval(repeatTime);
     return
   }   
   const timer = convertMs(interval);
   myCounter.children[0].children[0].innerText = timer.days.toString().padStart(2, '0');
   myCounter.children[1].children[0].innerText = timer.hours.toString().padStart(2, '0');
   myCounter.children[2].children[0].innerText = timer.minutes.toString().padStart(2, '0');
   myCounter.children[3].children[0].innerText = timer.seconds.toString().padStart(2, '0');
  }, 1000);

  startBtn.disabled = true;
  pickDatetime.disabled = true;
};

//=====================================================
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

// =====================================================


