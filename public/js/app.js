    const modal = document.querySelector('.modal');
    let btn  = document.querySelector("#btn")

btn.addEventListener('click' , function(){
    modal.classList.remove("hidden")
    // modal.classList.add("flex")
})
   

setTimeout(function(item , index){
    modal.classList.remove("hidden")
} , 2000)

setTimeout(function(item, index) {
    modal.classList.remove("hidden");
}, 300000); // 5 daqiqa = 300,000 ms

setTimeout(function(item, index) {
    modal.classList.remove("hidden");
}, 600000); // 5 daqiqa = 300,000 ms
