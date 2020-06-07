import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlackScholesService {
    stock;
    strike;
    interest;
    vola;
    term;
    BlackScholesService(){}

    doCalc(stock:number,strike:number,interest:number,vola:number,term:number)
        {
            this.stock = Math.max(stock, 0);
            this.strike = Math.max(strike, 0);
            this.interest = Math.max(interest, 0);
            this.vola = Math.max(vola, 0);
            this.term = Math.max(term, 0);
        }    

    normalcdf(X) {   //HASTINGS.  MAX ERROR = .000001
        var T = 1 / (1 + .2316419 * Math.abs(X));
        var D = .3989423 * Math.exp(-X * X / 2);
        var Prob = D * T * (.3193815 + T * (-.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))));
        if (X > 0) {
            Prob = 1 - Prob;
        }
        return Prob;
    }
    compute(Z, M, SD) {
        var Prob;
        if (SD < 0) {
            console.log("normal", "The standard deviation must be nonnegative.");
        } else if (SD === 0) {
            if (Z < M) {
                Prob = 0;
            } else {
                Prob = 1;
            }
        } else {
            Prob = this.normalcdf((Z - M) / SD);
            Prob = Math.round(100000 * Prob) / 100000;
        }

        return Prob;
    }
    /**
     * standard normal distribution.
     * @param {Number} Z x-Value
     * @returns {Number|normalcdf.D|normalcdf.T|normalcdf.Prob}
     */
    stdcompute(Z) {
        return this.compute(Z, 0, 1);
    }
    /**
     * standard density function
     * @param {type} x Value
     * @returns {Number}
     */
    stdpdf(x) {
        var m = Math.sqrt(2 * Math.PI);
        var e = Math.exp(-Math.pow(x, 2) / 2);
        return e / m;
    }
    call()
    {

        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var d2 = d1 - (this.vola * Math.sqrt(this.term));
        var res = Math.round((this.stock * this.stdcompute(d1) - this.strike * Math.exp(-this.interest * this.term) * this.stdcompute(d2)) * 100) / 100;
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    put()
    {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var d2 = d1 - (this.vola * Math.sqrt(this.term));
        var res = Math.round((this.strike * Math.pow(Math.E, -this.interest * this.term) * this.stdcompute(-d2) - this.stock * this.stdcompute(-d1)) * 100) / 100;
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    cdelta()
    {

        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var res = Math.max(this.stdcompute(d1), 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    pdelta()
    {

        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var res = Math.min(this.stdcompute(d1) - 1, 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    gamma()
    {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var phi = this.stdpdf(d1);
        var res = Math.max(phi / (this.stock * this.vola * Math.sqrt(this.term)), 0);
        ;
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    vega() {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var phi = this.stdpdf(d1);
        var res = Math.max(this.stock * phi * Math.sqrt(this.term), 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;

    }
    ctheta() {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var d2 = d1 - (this.vola * Math.sqrt(this.term));
        var phi = this.stdpdf(d1);
        var s = -(this.stock * phi * this.vola) / (2 * Math.sqrt(this.term));
        var k = this.interest * this.strike * Math.exp(-this.interest * this.term) * this.normalcdf(d2);
        var res = Math.min(s - k, 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    ptheta() {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var d2 = d1 - (this.vola * Math.sqrt(this.term));
        var phi = this.stdpdf(d1);
        var s = -(this.stock * phi * this.vola) / (2 * Math.sqrt(this.term));
        var k = this.interest * this.strike * Math.exp(-this.interest * this.term) * this.normalcdf(-d2);
        var res = Math.min(s + k, 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    crho() {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var nd2 = this.normalcdf(d1 - (this.vola * Math.sqrt(this.term)));
        var res = Math.max(this.term * this.strike * Math.exp(-this.interest * this.term) * nd2, 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    prho() {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var nnd2 = this.normalcdf(-(d1 - (this.vola * Math.sqrt(this.term))));
        var res = Math.min(-this.term * this.strike * Math.exp(-this.interest * this.term) * nnd2, 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    comega() {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var nd2 = this.normalcdf(d1 - (this.vola * Math.sqrt(this.term)));
        var res = nd2 * (this.stock / this.call());
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    pomega() {
        var d1 = (Math.log(this.stock / this.strike) + (this.interest + .5 * Math.pow(this.vola, 2)) * this.term) / (this.vola * Math.sqrt(this.term));
        var nd2 = this.normalcdf(d1 - (this.vola * Math.sqrt(this.term)));
        var res = (nd2 - 1) * (this.stock / this.put());
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }


    setStock(s) {
        if (typeof s === 'undefined') {
            return this.stock;
        } else {
            this.stock = Math.max(s, 0);
            return this;
        }
    };

    setStrike(s) {
        if (typeof s === 'undefined') {
            return this.strike;
        } else {
            this.strike = Math.max(s, 0);
            return this;
        }
    };
    setInterest(s) {
        if (typeof s === 'undefined') {
            return this.interest;
        } else {
            this.interest = Math.max(s, 0);
            return this;
        }
    };
    setVola(s) {
        if (typeof s === 'undefined') {
            return this.vola;
        } else {
            this.vola = Math.max(s, 0);
            return this;
        }
    };
    setTerm(s) {
        if (typeof s === 'undefined') {
            return this.term;
        } else {
            this.term = Math.max(s, 0);
            return this;
        }
    }
}