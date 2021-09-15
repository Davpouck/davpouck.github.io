"use strict"

let writer = DropboxAPI("f8KRMO6zti4AAAAAAAAAAatgh2WcBTD9zOws9cgKyWINOFednwVOWHTvv-HvMedF")

/** FORMAAT FILE
 *  ID;Omschrijving;Betaald door;Bedrag;Datum;Categorie;Opmerkingen
 **/

function addPayment() {
    let payment = {
        omschrijving:   document.getElementById("description").value,
        betaald_door:   betaald_door,
        bedrag:         document.getElementById("amount").value,
        datum:          document.getElementById("pay-time").value,
        categorie:      document.getElementById("category").value,
        opmerkingen:    document.getElementById("comment").value,
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
        })
    })
}


