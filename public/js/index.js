const modal = document.querySelector('.modal');
let btn  = document.querySelector("#btn")

btn.addEventListener('click' , function(){
modal.classList.remove("hidden")
// modal.classList.add("flex")
})
AOS.init();
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const closeButton = document.getElementById('close');
  const overlay = document.querySelector('.overlay');
  let player;
  let intervalId = null;
  let lastShownMinute = 0;

  overlay.addEventListener("click", function () {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  })


  const openModal = () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  closeButton.addEventListener('click', closeModal);

  const checkVideoTime = () => {
    const currentTime = player.getCurrentTime();
    const currentMinute = Math.floor(currentTime / 60);
    if (currentMinute !== lastShownMinute && currentMinute % 5 === 0) {
      openModal();
      lastShownMinute = currentMinute;
    }
  };

  const onYouTubeIframeAPIReady = () => {
    player = new YT.Player('youtube-video', {
      events: {
        'onStateChange': (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            if (!intervalId) {
              intervalId = setInterval(checkVideoTime, 1000);
            }
          } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      }
    });
  };

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
});
