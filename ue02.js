function istEan(artNum) {
    artNum = String(artNum);

    if (artNum.length === 8 )
        artNum = "00000" + artNum;
    else if (artNum.length !== 13)
        return false;

    let checkSum = artNum.substr(artNum.length - 1);
    artNum = artNum.substr(0, artNum.length - 1);

    let num = 0;
    artNum.split("").forEach((s, i) => { if (i % 2 === 1) num += Number(s) });

    num *= 3;
    artNum.split("").forEach((s, i) => { if (i % 2 === 0) num += Number(s); });
    let modulo = num % 10;
    num = Math.floor(num / 10);

    if (modulo !== 0)
        modulo = 10 - modulo

    return checkSum == modulo;
}


function staerke(pw) {
    let strength = pw.length;
    let typeCount = 0;
    let types = [/[a-z]/g, /[A-Z]/g, /[0-9]/g, /[\W]/g];
    for (let type of types)
        if (type.test(pw)) typeCount++;
    strength *= typeCount;
    strength *= pw.split("").filter((s, i) => { return pw.indexOf(s) === i }).length;
    return strength;
}


function rot13(text) {
    const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    return text.split('').map(n => input.indexOf(n) > -1 ? output[input.indexOf(n)] : n).join('');
}


console.log(istEan("5901234123457"))

console.log(istEan("5901234123456"))

console.log(rot13("Hallo, 4AI"))

console.log(staerke("12345"))
console.log(staerke("*~#"))
console.log(staerke("Hallo1"))
console.log(staerke("KsdkaP)43*ß9"))