"use strict"

/** FORMAAT FILE
 *  ID;Omschrijving;Betaald door;Bedrag;Datum;Categorie;Opmerkingen
 **/

let payments

function PaymentDivHTML(payment, index) {
    function ISOToString(time) {
        let days = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"]
        time = time.split("T")
        let date = time[0].split("-")
        let date_obj = new Date(date)
        
        // return time[1]+" "+date[2]+"/"+date[1]+"/"+date[0].slice(2)
        return ""+days[date_obj.getDay()]+" "+date[2]+"/"+date[1]+"/"+date[0].slice(2) + " " + time[1]
    }
    let icon = {
        "geen-categorie": '<i class="fas fa-question"></i>',
        "winkel": '<i class="fas fa-shopping-basket"></i>',
        "eten": '<i class="fas fa-utensils"></i>',
        "ontspanning": '<i class="fas fa-umbrella-beach"></i>',
        "huur": '<i class="fas fa-bed"></i>',
        "terugbetaling": '<i class="far fa-handshake"></i>',
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
    let kleur = payment[2]=="Fien" ? "#C8A2C8" : "#9AD0C1"
    let border_type = payment[5] == "terugbetaling" ? "dashed" : "solid"
    let html = "<div id=pay-"+ payment[0] +" class='hbox payment' style='border-color:"+kleur+";border-style:"+border_type+";flex-wrap:nowrap' onclick='editPayment("+payment[0]+")'>"
    html += "<div class='vbox-stretch' style='margin:0;justify-content:center'><b style='margin:0'>"+payment[1]+"</b><label style='margin:0;text-align;left;'>"+ISOToString(payment[4])+"</label></div>"
    html += "<div style='font-size:0.75rem;margin:0 5px 0 5px;' class=center-text>"+payment[6]+"</div>"
    html += "<div class='hbox center-text'  style='margin:0;flex-wrap:nowrap'><div style='margin-right:0.5rem;'>"+icon[payment[5]]+"</div><div>"+som_str+"</div></div>"
    html += "</div>"
    return html
}



let writer = DropboxAPI("f8KRMO6zti4AAAAAAAAAAatgh2WcBTD9zOws9cgKyWINOFednwVOWHTvv-HvMedF")

writer.getFile("betalingen.txt", (file) => {
    payments = file.split("\n").reverse().slice(1)
    payments.forEach((element, index, arr) => {
        if (element[0] != "-") {
            document.body.innerHTML += PaymentDivHTML(element, index)
        }
    });
})

function editPayment(id) {
    sessionStorage.setItem('id', id)
    location.href = "./edit_betaling.html"
}