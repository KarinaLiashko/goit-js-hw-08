import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });


const currentTime = function (data) {
    localStorage.setItem(
        'videoplayer-current-time',
        JSON.stringify(data.seconds)
    );

    let time = Number(localStorage.getItem('videoplayer-current-time'));
    console.log(time);
}

player.on('timeupdate', currentTime);
 
player.setCurrentTime(localStorage)
    .then(function (seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});


