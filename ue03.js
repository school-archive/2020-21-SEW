class Komplex {
    constructor(arg1, im) {
        this.re = 0;
        this.im = 0;
        if (arg1 instanceof Komplex) {
            this.re = arg1.re;
            this.im = arg1.im;
        } else if (!Number.isNaN(Number(arg1))) this.re = Number(arg1);
        if (!Number.isNaN(Number(im))) this.im = Number(im);
    }

    add(komplex) {
        this.re += komplex.re;
        this.im += komplex.im;
        return this;
    }

    mult(komplex) {
        const re = this.re * komplex.re - this.im * komplex.im;
        this.im = this.re * komplex.im + this.im * komplex.re;
        this.re = re;
        return this;
    }

    toString() {
        if (this.im === 0)
            return this.re;
        else if (this.re === 0)
            return this.im + "i";
        return this.re + " + " + this.im + "i";
    }

}

const k1 = new Komplex(4, 2);
const k2 = new Komplex(2, 3);

console.log(k1.mult(k2).toString())
console.log(k1.add(k2).toString())

console.log(new Komplex().toString())
console.log(new Komplex(k2).toString())
console.log(new Komplex(0, 2).toString())