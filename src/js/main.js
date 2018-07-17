/***
 * file name : main.js
 * description : miniSync entry file
 * create date : 2018-07-17
 * creator : saltgamer
 ***/

import Sound from './Sound';
import Sync from './Sync';

window.miniSync = (params) => {
    const sound = new Sound(params.audio);
    const sync = new Sync(params.miniSvg ,params.syncInfo);

    sound.audio.addEventListener('ended', (e) => {
        sound.stop();
        sync.end();
        params.callBack(params.playButton);
    });

    params.playButton.addEventListener('click', (e) => {
        e.preventDefault();

        sound.play();
        sync.syncPause = false;
        sync.start(sound);
        params.playButton.style.backgroundColor = '#ff0000';
    });

};