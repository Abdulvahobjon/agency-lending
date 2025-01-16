    const modal = document.querySelector('.modal');
    const closeButton = document.getElementById('close');
    const video = document.querySelector('iframe');
    let intervalId = null;
    let logIntervalId = null;

    const openModal = () => {
        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
    };

    closeButton.addEventListener('click', closeModal);



    const logVideoTime = (player) => {
        logIntervalId = setInterval(() => {
            const currentTime = player.getCurrentTime();
            console.log(`Current video time: ${currentTime} seconds`);
        }, 1000); // Har soniyada vaqtni konsolga chiqarish
    };

    const onYouTubeIframeAPIReady = () => {
        const player = new YT.Player(video, {
            events: {
                'onReady': () => {
                    logVideoTime(player); // Video tayyor bo'lganda vaqtni logga chiqarishni boshlash
                },
                'onStateChange': (event) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        console.log("succes");

                        if (!intervalId) {
                            startModalTimer();
                        }
                    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                        clearInterval(intervalId);
                        clearInterval(logIntervalId); // Log intervalni to'xtatish
                        intervalId = null;
                        logIntervalId = null;
                    }
                }
            }
        });
    };

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

const startModalTimer = () => {
    intervalId = setInterval(() => {
        openModal();
    }, 300); // 300000 ms = 5 daqiqa
};
