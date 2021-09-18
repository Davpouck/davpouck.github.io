"use strict"

/** FORMAAT FILE
 *  ID;Omschrijving;Betaald door;Bedrag;Datum;Categorie;Opmerkingen
 **/

function PaymentDivHTML(payment) {
    function ISOToString(time) {
        time = time.split("T")
        let date = time[0].split("-")
        return time[1]+" "+date[2]+"/"+date[1]+"/"+date[0].slice(2)
    }
    let icon = {
        "geen-categorie": '<i class="fas fa-question"></i>',
        "winkel": '<i class="fas fa-shopping-basket"></i>',
        "eten": '<i class="fas fa-utensils"></i>',
        "ontspanning": '<i class="fas fa-umbrella-beach"></i>',
        "huur": '<i class="fas fa-bed"></i>',
        "overige": '<i class="fas fa-ellipsis-h"></i>',
    }
    payment = payment.split(";")
    let som_str = payment[3]
        if (som_str.length == 1) {
          som_str = "00" + som_str
        }
        if (som_str.length == 2) {
          som_str = "0" + som_str
        }
    som_str = "€" + som_str.slice(0,-2) + "." + som_str.slice(-2)
    console.log(payment)
    let kleur = payment[2]=="Fien" ? "#C8A2C8" : "#AAF0D1"
    let html = "<div id=pay-"+ payment[0] +" class='hbox payment' style='border-color:"+kleur+"'>"
    html += "<div>"+icon[payment[5]]+"</div>"
    html += "<div class='vbox-stretch' style='margin:0'><b style='margin:0'>"+payment[1]+"</b><label style='margin:0'>"+ISOToString(payment[4])+"</label></div>"
    // html += "<div>"+ISOToString(payment[4])+"</div>"
    html += "<div>"+payment[2][0]+": "+som_str+"</div>"
    html += "</div>"
    return html
}

let writer = DropboxAPI("f8KRMO6zti4AAAAAAAAAAatgh2WcBTD9zOws9cgKyWINOFednwVOWHTvv-HvMedF")

writer.getFile("betalingen.txt", (file) => {
    let payments = file.split("\n").reverse().slice(1)
    payments.forEach((element, index, arr) => {
        if (index < 10) {
            document.body.innerHTML += PaymentDivHTML(element)
        }
    });
})