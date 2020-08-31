"use strict"

let playing_music = document.createElement('audio');
playing_music.src = null;
document.body.append(playing_music);

document.addEventListener('click', function(event) {
    let target = event.target;
    startMusic(target);
});

function startMusic(target) {
    if (playing_music.src) {
        playing_music.pause();
    }

    playing_music.src = "assets/audio/t" + target.id[0] + "/" + target.id[1] + ".mp3";
    playing_music.play();
}

