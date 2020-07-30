"use strict"

let unload = true;

window.onbeforeunload = function() {
    if (unload) {
        return void (0);
    }
    return "Data will be lost if you leave the page, are you sure?";
};

/* Vraag */

function checkboxClick(i) {
    eliminatie.addAnswer(i);
    eliminatie.displayVragen();
}


function nextVraag() {
    eliminatie.selected_vraag++;
    eliminatie.displayVragen();
}

function prevVraag() {
    eliminatie.selected_vraag--;
    eliminatie.displayVragen();
}

function jumpToVraag(index) {
    eliminatie.selected_vraag = index;
    eliminatie.displayVragen();
}


class Eliminatie {
    constructor(vragen) {
        this.vragen = vragen;
        this.aantal_vragen = vragen.length;
        this.selected_vraag = undefined;
        this.vragen.forEach((element, index) => element.nr = index+1);
        this.aantal_beantwoord = 0;
    }

    displayVragen() {
        let vraag = document.getElementById("vraag");
        // show sidebar
        for (let i = 0; i < 20; i++) {
            document.getElementById("sidebar").children[i].hidden = i >= eliminatie.aantal_vragen;
        }
        // hide or show elimination
        document.getElementById("eliminatie").hidden = this.selected_vraag == undefined;
        // show selected question
        vraag.children[0].textContent = this.vragen[this.selected_vraag].nr + ". " + this.vragen[this.selected_vraag].vraag;
        // show options
        let opties = vraag.querySelectorAll(".optie");
        let index = 0;
        for (let optie of opties) {
            optie.querySelector(".checkbox").innerHTML = "";
            if (index >= this.vragen[this.selected_vraag].aantal_opties) {
                optie.hidden = true;
            }
            else {
                optie.hidden = false;
                optie.lastElementChild.textContent = this.vragen[this.selected_vraag].opties[index];  
            }
            index++;
        }
        let keuze_vraag = this.vragen[this.selected_vraag].keuze;
        if (keuze_vraag != undefined) {
            opties[keuze_vraag].querySelector(".checkbox").innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        }
    }

    addAnswer(optie) {
        if (this.vragen[this.selected_vraag].keuze == undefined) {
            this.aantal_beantwoord++;
        }
        this.vragen[this.selected_vraag].keuze = optie;
        document.getElementById("sidebar").children[this.selected_vraag].classList.add("filled");
        if (this.aantal_beantwoord == this.aantal_vragen) {
            document.getElementById("submit").classList.remove("disabled");
            document.getElementById("submit").onclick = function() {clockStop()};
        }
    }

    get selected_vraag() {return this._selected_vraag;}

    set selected_vraag(index) {
        if (index >= 0 && index < this.aantal_vragen) {
            if (this.selected_vraag == undefined) {
                this._selected_vraag = index;
                document.getElementById("sidebar").children[index].classList.add("selected");
            }
            else {
                document.getElementById("sidebar").children[this.selected_vraag].classList.remove("selected");
                this._selected_vraag = index;
                document.getElementById("sidebar").children[index].classList.add("selected");
            }
        }
    }
}

class Vraag {
    constructor(vraag, opties) {
        this.vraag = vraag;
        this.opties = opties;
        this.aantal_opties = opties.length;
        this.keuze = undefined;
        this.nr = undefined;
    }

    get keuze() {
        return this._keuze;
    }

    set keuze(optie) {
        if (optie >= 0 && optie < this.aantal_opties) {
            this._keuze = optie;
        }
    }

    get nr() {
        return this._nr;
    }

    set nr(number) {
        this._nr = number;
    }
}

let vraag0 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag1 = new Vraag("vb2", ["test", "optie 2", "optie 3", "optie 4", "optie 5", "optie 6", "optie 7", "optie 8", "optie 9", "optie 10", "optie 11", "optie 12"], 7);
let vraag2 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag3 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag4 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag5 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag6 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag7 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag8 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag9 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag10 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag11 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag12 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag13 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag14 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag15 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag16 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag17 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag18 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);
let vraag19 = new Vraag("vb1", ["optie 1", "optie 2", "optie 3"], 2);

let eliminatie = new Eliminatie([vraag0/*, vraag1, vraag2, vraag3, vraag4, vraag5, vraag6, vraag7, vraag8, vraag9, vraag10, vraag11, vraag12, vraag13, vraag14, vraag15, vraag16, vraag17, vraag18, vraag19*/]);

/* clock */

let timerId;
let timer = new Date(0);

function update() {
    timer.setSeconds(timer.getSeconds() + 1);
    let clock = document.getElementById('clock');

    let minutes = timer.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    clock.children[0].innerHTML = minutes;

    let seconds = timer.getSeconds();
    if (seconds < 10) seconds = '0' + seconds;
    clock.children[1].innerHTML = seconds;
}

function clockStart() {
    let name = document.getElementById("naam");
    let start = document.getElementById("start");
    if (name.value != "fout") {
        name.labels[0].textContent = "naam: " + name.value;
        name.hidden = true;
        start.hidden = true;
        eliminatie.selected_vraag = 0;
        eliminatie.displayVragen();
        timerId = setInterval(update, 1000);
        unload = false;
    }
    else {
        start.textContent = "kies een naam";
        setTimeout(() => start.textContent = "start", 2000);
    }
}

function clockStop() {
    clearInterval(timerId);
    let clock = document.getElementById('clock');
    clock.style.backgroundColor = "#46aebc";
    setTimeout(() => clock.style.backgroundColor ="", 2000);
    Pageclip.send('ttyOwMDLUTuoIOR3IXlv5MI0BXksdvFh', 'test', eliminatie, function (error, response) {
        console.log('saved?', !!error, '; response:', error || response)
        if (error || response.data != "ok") {
            let opnieuw = confirm("Verzenden mislukt!\nOpnieuw proberen?");
            document.getElementById("eliminatie").hidden = true;
            if (!opnieuw) {
                unload = true;
                let return_href = document.location.protocol == "file:" ? "./index.html" : "./";
                window.location.href = return_href;
            }
        }
        else {
            document.body.innerHTML = "<div class='info'><p>Bedankt.</p><p>De Eliminatie-vragen zijn goed ingevuld.</p></div><div class='loadingBox'><div id='loadingBar'></div></div>";
            unload = true;
            let return_href = document.location.protocol == "file:" ? "./index.html" : "./";
            setTimeout(() => loadingBar.style.width = "100%",100);
            setTimeout(() => window.location.href = return_href, 5100);
        }
      })
}
    

