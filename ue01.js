function lottoTipp() {
    const tipp = [];
    while (tipp.length < 6) {
        const rand = Math.ceil(Math.random() * 45);
        if (!tipp.includes(rand))
            tipp.push(rand);
    }
    tipp.sort((a, b) => a - b);
    return tipp;
}

console.log(lottoTipp())

function wechseln(betrag) {
    const availableCoins = [200, 100, 50, 20, 10, 5, 2, 1];
    let remaining = betrag;
    const coins = {};
    for (let coin of availableCoins) {
        if (remaining / coin >= 1) {
            coins[coin] = Math.floor(remaining / coin);
            remaining = remaining % coin;
        }
    }
    return coins;
}

console.log(wechseln(102))
console.log(wechseln(284))

function umkehren(text) {
    // Alle Zeichen werden in einen Array umgewandelt
    // Danach wird der Array umgedreht
    // mit join() wird der Array zu einem String zusammengefasst
    return text.split("").reverse().join("");
}

console.log(umkehren("Hallo, Welt"))