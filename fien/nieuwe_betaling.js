"use strict"

let writer = DropboxAPI("f8KRMO6zti4AAAAAAAAAAatgh2WcBTD9zOws9cgKyWINOFednwVOWHTvv-HvMedF")

/** FORMAAT FILE
 *  ID;Omschrijving;Betaald door;Bedrag;Datum;Categorie;Opmerkingen
 **/

function addPayment() {
    function checkBedrag(x) {
        x = x.replaceAll(",",".")
        if (isFinite(x)) {
            x = x.split(".")
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
    document.getElementById("oke-button").innerHTML = '<div class="loader"></div>'
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
        document.getElementById("oke-button").innerHTML = 'Oké'
        return
    }
    writer.getFile("betalingen.txt", (file) => {
        let payments = file.split("\n")
        let id = payments.length
        let new_file = file +
                                id + ";" +
                                payment.omschrijving + ";" +
                                payment.betaald_door + ";" +
                                payment.bedrag + ";" +
                                payment.datum + ";" +
                                payment.categorie + ";" +
                                payment.opmerkingen + "\n"
        writer.putFile("betalingen.txt", new_file, (t) => {
            alert("betaling opgeslagen")
            location.href = "./index.html"
        }).finally(() => document.getElementById("oke-button").innerHTML = 'Oké')
    })
}


