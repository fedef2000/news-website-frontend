export default function parseDate(date){
    const day = date.substring(8,10)
    let month = ""
    switch (date.substring(5,7)) {
        case '01':
            month = "Gennaio"
            break;
        case '02':
            month = "Febbraio"
            break;
        case '03':
            month = "Marzo"
            break;
        case '04':
            month = "Aprile"
            break;
        case '05':
            month = "Maggio"
            break;
        case '06':
            month = "Giugno"
            break;
        case '07':
            month = "Luglio"
            break;
        case '08':
            month = "Agosto"
            break;
        case '09':
            month = "Settembre"
            break;
        case '10':
            month = "Ottobre"
            break;
        case '11':
            month = "Novembre"
            break;
        case '12':
            month = "Dicembre"
            break;
        default:
            break;
    }
    return `${day} ${month}`
}