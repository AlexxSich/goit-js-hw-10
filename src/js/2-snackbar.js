import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const snackForm = document.querySelector(".form");

snackForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault()
  const delay = snackForm.elements.delay.value;
  const state = snackForm.elements.state.value;
 

const promise = new Promise((resolve, rejected) => {
  setTimeout(() => {
      if(state === "fulfilled"){
        resolve(delay);
      } else {
        rejected(delay);
      }
  }, delay);
 }); 

 promise.then((delay)=>{
            iziToast.success({
                  position: 'topRight',
                  title: 'Success',
                  message: `✅ Fulfilled promise in ${delay}ms`,                  
                })   
})
        .catch((delay)=>{
            iziToast.error({
                  position: 'topRight',
                  title: 'Error',
                  message: `❌ Rejected promise in ${delay}ms`,
            })   
});

event.currentTarget.reset();
}