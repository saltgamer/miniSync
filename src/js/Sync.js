/***
 * file name : Sync.js
 * description : sync class
 * create date : 2018-07-17
 * creator : saltgamer
 ***/

export default class Sync {
    constructor(miniSvg, info) {
        this.svgElement = miniSvg;
        this.noteKey = 'note_';
        this.fillColor = info.fillColor;
        this.startTime = info.start;
        this.endTime = info.end;
        this.noteCount = info.noteSyncData.length;
        this.noteSyncData = info.noteSyncData;
        this.speedAdjust = info.speedAdjust;

        this.currentTime = 0;
        this.currentIndex = 0;
        this.currentNote = this.noteKey + '001';



        this.sound = null;
        this.syncPause = false;

        this.beat = ((this.endTime - this.startTime) / this.noteCount) + this.speedAdjust;

        this.initSync();


    }

    start(sound) {
        this.sound = sound;
        this.render();
    }

    initSync() {
        this.currentSyncStart = this.startTime;
        this.currentSyncEnd = this.startTime + (this.noteSyncData[this.currentIndex] * this.beat);
    }

    onSymbol(target) {
        const targetElement = this.svgElement.querySelector('#' + target);
        if (targetElement) {
            // console.log('--------------------------targetElement: ', targetElement.childNodes);
            if (targetElement.childNodes.length > 1) {
                targetElement.childNodes.forEach((element) => {
                    // console.log('-element: ', element);
                    if (element.nodeName !== '#text') {
                        element.style.stroke = this.fillColor;
                    }

                });
            } else {
                targetElement.style.stroke = this.fillColor;
            }

        }
        this.currentNote = target;
    }

    offSymbol(target) {
        // this.svgElement.querySelector('#' + target).style.fill = '#000';
        const targetElement = this.svgElement.querySelector('#' + target);
        if (targetElement) {
            if (targetElement.childNodes.length > 1) {
                targetElement.childNodes.forEach((element) => {
                    if (element.nodeName !== '#text') {
                        element.style.stroke = '#000';
                    }
                });
            } else {
                targetElement.style.stroke = '#000';
            }

        }
    }

    render() {
        this.currentTime = this.sound.audio.currentTime;
        console.log('~* currentTime: ', this.currentTime);

        this.noteChecker();

        if (!this.syncPause) {
            setTimeout(() => {
                window.requestAnimationFrame(this.render.bind(this));
            }, 1000 / 20);
        }

    }

    noteChecker() {

        if (this.currentTime >= this.currentSyncStart) {
            console.log('- currentSyncStart: ', this.currentSyncStart);
            console.log('- onSymbol: ', this.getNoteId(this.currentIndex));
            this.onSymbol(this.getNoteId(this.currentIndex));
        }

        if (this.currentTime >= this.currentSyncEnd) {
            console.log('- currentSyncEnd: ', this.currentSyncEnd);
            this.offSymbol(this.getNoteId(this.currentIndex));
            this.updateSync();
        }

        if (this.currentTime >= this.sectionEnd) {
            this.sound.stop();
            this.end();
        }


    }

    updateSync() {
        this.currentIndex++;
        this.currentSyncStart = this.currentSyncEnd;
        this.currentSyncEnd += this.noteSyncData[this.currentIndex] * this.beat;

        console.log('-----------------------updateSync----------------------');
        console.log('- currentSyncStart: ', this.currentSyncStart);
        console.log('- currentSyncEnd: ', this.currentSyncEnd);
        console.log('- syncData: ', this.noteSyncData[this.currentIndex]);
        console.log('- duration: ', this.noteSyncData[this.currentIndex] * this.beat);

    }

    getNoteId(syncIndex) {
        let index = syncIndex + 1;
        if (index < 10) {
            index = this.noteKey + '00' + index;
        } else if (index < 100) {
            index = this.noteKey + '0' + index;
        } else {
            index = this.noteKey + index;
        }

        return index;
    }

    end() {
        this.syncPause = true;
        this.currentIndex = 0;
        this.initSync();
        this.currentNote = this.noteKey + '001';
    }

}
