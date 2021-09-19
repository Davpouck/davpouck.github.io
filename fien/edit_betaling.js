"use strict"

let writer = DropboxAPI("f8KRMO6zti4AAAAAAAAAAatgh2WcBTD9zOws9cgKyWINOFednwVOWHTvv-HvMedF")

/** FORMAAT FILE
 *  ID;Omschrijving;Betaald door;Bedrag;Datum;Categorie;Opmerkingen
 **/
let id = sessionStorage.getItem("id")
if (id == undefined) {
    location.href = "./overzicht.html"
}
sessionStorage.clear()
writer.getFile("betalingen.txt", (file) => {
    let payment = file.split("\n")[id].split(";")
    document.getElementById("description").value = payment[1]
    payment[2] == "Fien" ? document.getElementById("betaald-fien").click() : document.getElementById("betaald-dante").click()
    document.getElementById("amount").value = payment[3].slice(0, -2) + "." + payment[3].slice(-2)
    document.getElementById("pay-time").value = payment[4]
    document.getElementById("category").value = payment[5]
    document.getElementById("comment").value = payment[6]
})


function delPayment() {
    if (!confirm("Bent u zeker dat u deze betaling wilt verwijderen?")) {
        return
    }
    document.getElementById("del-button").innerHTML = '<div class="loader"></div>'
        writer.getFile("betalingen.txt", (file) => {
            let payments = file.split("\n")
            payments[id] = "-" + payments[id]
            writer.putFile("betalingen.txt", payments.join("\n"), (t) => {
                document.getElementById("del-button").innerHTML = 'Verwijder'
                alert("betaling opgeslagen")
                location.href = "./overzicht.html"
            }, () => document.getElementById("del-button").innerHTML = 'Verwijder')
        })
    
}

function savePayment() {
    if (!confirm("Bent u zeker dat deze wijzigingen wilt opslaan?")) {
        return
    }
    function checkBedrag(x) {
        x = x.replaceAll(",",".")
        if (isFinite(x)) {
            x = x.split(".")
            if (x.length == undefined) {
                x[1] = "0"
            }
            if (parseInt(x[0]) > 0 && x[1].length <= 2) {
                payment.bedrag = parseInt(x[0])*100 + parseInt(x[1])
                document.getElementById("amount-euro").style.borderColor = "#dac65a"
                document.getElementById("amount").style.borderColor = "#dac65a"
                return
            }
        }
        document.getElementById("amount-euro").style.borderColor = "#ff0000"
        document.getElementById("amount").style.borderColor = "#ff0000"
        goed = false
    }
    function checkOmschrijving() {
        if (payment.omschrijving == "") {
            document.getElementById("description").style.borderColor = "#ff0000"
            goed = false
        } else {
            document.getElementById("description").style.borderColor = "#dac65a"
        }
    }
    document.getElementById("save-button").innerHTML = '<div class="loader"></div>'
    let goed = true
    let payment = {
        omschrijving:   document.getElementById("description").value,
        betaald_door:   betaald_door,
        bedrag:         document.getElementById("amount").value,
        datum:          document.getElementById("pay-time").value,
        categorie:      document.getElementById("category").value,
        opmerkingen:    document.getElementById("comment").value,
    }
    checkBedrag(document.getElementById("amount").value)
    checkOmschrijving()
    if (!goed) {
        document.getElementById("save-button").innerHTML = 'Oké'
        return
    }
    writer.getFile("betalingen.txt", (file) => {
        let payments = file.split("\n")
        payments[id] =          id + ";" +
                                payment.omschrijving + ";" +
                                payment.betaald_door + ";" +
                                payment.bedrag + ";" +
                                payment.datum + ";" +
                                payment.categorie + ";" +
                                payment.opmerkingen
        writer.putFile("betalingen.txt", payments.join("\n"), (t) => {
            alert("betaling opgeslagen")
            location.href = "./overzicht.html"
        }, () => document.getElementById("save-button").innerHTML = 'Oké')
    })
    
}


