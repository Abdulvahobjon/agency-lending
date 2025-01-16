let closeBtn = document.querySelector('#close')
let form = document.querySelector('.modal')

closeBtn.addEventListener('click' , ()=>{
    form.classList.add("hidden")
    form.classList.remove("flex")
})
setTimeout(function () {
    form.classList.remove('hidden')
    form.classList.add('flex')

    setInterval(() => {
        form.classList.remove('hidden')
        form.classList.add('flex')
    }, 120000);
}, 5000)
