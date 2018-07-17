/***
 * file name : Sound.js
 * description : Sound class
 * create date : 2018-07-17
 * creator : saltgamer
 ***/

export default class Sound {
    constructor(src) {
        this.src = src;
        this.audio = new Audio();
        this.audio.volume = 1;

    }

    load() {
        this.audio.src = this.src;
        this.audio.load();
        return this;

    }

    isBuffered() {
        return this.audio.buffered.length > 0;
    }

    play() {
        if (this.audio && this.isBuffered()) {
            this.audio.play();
        } else {
            this.load();
            this.audio.play();
        }

        return this;
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }


}
