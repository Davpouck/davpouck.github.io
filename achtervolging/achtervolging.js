"use strict"

class intProperty {
    
    listeners = []
    constructor(v) {
        // invokes the setter
        this.value = v;
    }
  
    get value() {
        return this._value;
    }
  
    set value(v) {
        if (v != this._value) {
            this.listeners.forEach((item) => {
                item.call(window, this._value, v)
            })
            this._value = v;
        }
    }

    addListener = function(fn) {
        this.listeners.push(fn)
    }

    removeListener = function(fn) {
        this.listeners = this.listeners.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    getProperty = function() {
        return this
    }
  
}

let data = [{team: "team1", delay: 0},
            {team: "team2", delay: 13},
            {team: "team3", delay: 9},
            {team: "team4", delay: 9},
            {team: "team5", delay: 2},]

const pre_start_countdown = 5;


let ticks;
let time;
let timer;
let state = "stoped";

function init(data) {
    if (state != "stoped") {
        alert("first stop to initialize!")
        return;
    }
    data.sort((a,b) => a.delay-b.delay)
    ticks = new intProperty(0);
    time = new intProperty(pre_start_countdown);
    updateLabelDOM()
    updateTimeDOM(5)
    ticks.addListener((old_value, new_value) => updateTime(new_value))

    time.addListener((old_value, new_value) => updateTimeDOM(new_value))
    time.addListener((old_value, new_value) => updateLabelDOM())
    time.addListener((old_value, new_value) => playSound(old_value, new_value))
    state = "initialized"
}

function start() {
    if (state != "initialized") {
        alert("first initialize to start!")
        return
    }
    state = "busy"
    timer = setInterval(() => {
        document.getElementById("countdown-time").innerHTML = "&nbsp"
        setTimeout(() => {
            ticks.value++
        }, 150)
    }, 1000)
}

function stop() {
    if (state != "busy") {
        alert("first start to stop!")
        return
    }
    clearInterval(timer)
    document.getElementById("countdown-label").innerHTML = ""
    state = "stoped"
}

function updateTime(ticks) {
    if (time.value > 0) time.value--;
    else {
        let counter = 0;
        while (counter < data.length) {
            if (ticks-pre_start_countdown < data[counter].delay) break;
            counter++;
        }
        if (counter >= data.length) {stop(); return;} // end
        time.value = data[counter].delay - (ticks-pre_start_countdown)
    } 
}

function updateTimeDOM(time) {
    document.getElementById("countdown-time").innerHTML = time == 0 ? "GO!" : ""+time
}

function updateLabelDOM() {
    let index_of_current_team = data.findIndex((item) => ticks.value-pre_start_countdown < item.delay)
    if (index_of_current_team == -1) {
        document.getElementById("countdown-label").innerHTML = "";
        return
    }
    let html = "<div>"
    for (let e of data.filter((item) => item.delay == data[index_of_current_team].delay)) {
        html += e.team + "</div><div>"
    }
    html += "<div>"
    document.getElementById("countdown-label").innerHTML = html
}

function playSound(old_time, new_time) {
    if (new_time == 0) {
        document.getElementById("GO-sound").play()
        document.getElementById("color-overlay").style.backgroundColor = "#00ff00";
        document.getElementById("color-overlay").style.width = "100vw"
    } else if (new_time == 1 || new_time == 2 || new_time == 3) {
        document.getElementById("1-2-sound").play()
        document.getElementById("color-overlay").style.backgroundColor = "#ff0000";
        document.getElementById("color-overlay").style.width = "" + [100, 66.66, 33.33][new_time-1] + "vw"
    }
    else {
        document.getElementById("color-overlay").style.width = "" + 0 + "vw"
        document.getElementById("color-overlay").style.backgroundColor = "#ff0000";
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key == "i") {
        init(data)
        return
    }
    if (e.key == "s") {
        start()
        return
    }
})