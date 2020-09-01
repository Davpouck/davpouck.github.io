"use strict"

let playing_music = document.createElement('audio');
let playing_target = null;
playing_music.src = null;
playing_music.controls = true;
playing_music.style.position = "absolute";
document.body.append(playing_music);

document.addEventListener('click', function(event) {
    let target = event.target;
    startMusic(target);
});

function startMusic(target) {
    if (playing_music.src) {
        playing_music.pause();
        if (playing_target) {
            playing_target.style.color = null;
        }
    }

    playing_target = target;
    playing_music.src = "assets/audio/t" + target.id[0] + "/" + target.id[1] + ".mp3";
    target.style.color = "#46aebc";
    playing_music.play();
}

