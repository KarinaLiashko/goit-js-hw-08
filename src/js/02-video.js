import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_KEY_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const currentTime = localStorage.getItem(PLAYER_KEY_TIME);
if (currentTime) player.setCurrentTime(currentTime);

const saveCurrentTime = function (time) {
  localStorage.setItem(PLAYER_KEY_TIME, Math.round(time.seconds));
};

player.on('timeupdate', throttle(saveCurrentTime, 1000));

