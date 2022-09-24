 export default function titleToUrl(title){
    let res = title
    res = res.replace(/[^a-zA-Z0-9èàòùì ]/g, "")
    res = res.replaceAll(' ', '-')
    return res
}

