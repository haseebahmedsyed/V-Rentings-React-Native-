import { Car } from "../entities/Car";
import { calculateDistance } from './calDistance'

export class Fiteration {
    constructor(public cars: Car[], public query: any) {
    }

    comparePrice(a: Car, b: Car) {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }

    compareRating(a: Car, b: Car) {
        if (Number(a.rating) < Number(b.rating)) {
            return -1;
        }
        if (Number(a.rating) > Number(b.rating)) {
            return 1;
        }
        return 0;
    }

    sortByPrice(): this {
        if (this.query.sortPrice == 'true') {
            this.cars.sort(this.comparePrice);
        }
        return this;
    }

    sortByRating(): this {
        if (this.query.sortRating == 'true') {
            this.cars.sort(this.compareRating).reverse();
        }
        return this
    }

    sortByDistance(): this {
        let q2 = this.query
        if (this.query.sortDistance == 'true') {
            this.cars.sort(function (a: Car, b: Car) {
                let a1 = (calculateDistance(Number(a.location.latitude), Number(a.location.longitude), Number(q2.latitude), Number(q2.longitude)))
                let b1 = (calculateDistance(Number(b.location.latitude), Number(b.location.longitude), Number(q2.latitude), Number(q2.longitude)))
                if (a1 < b1) {
                    return -1;
                }
                if (a1 > b1) {
                    return 1;
                }
                return 0;
            });
        }
        return this
    }

    priceRange(){
        if(this.query.startPrice && this.query.endPrice){
            this.cars = this.cars.filter(c=>c.price >=Number(this.query.startPrice) && c.price <= Number(this.query.endPrice))
        }
        return this
    }

    filterTransmission(){
        if(this.query.transmission){
            this.cars = this.cars.filter(c=> this.query.transmission=='Manual' ? c.transmission=='Manual' : c.transmission=='Automatic')
        }
        return this
    }

    comparePassengers(a: Car, b: Car) {
        if (a.passengers < b.passengers) {
            return -1;
        }
        if (a.passengers > b.passengers) {
            return 1;
        }
        return 0;
    }

    filterByPassengers(){
        if(this.query.passengers){
            this.cars = this.cars.filter(c=>c.passengers>=Number(this.query.passengers))
            this.cars.sort(this.comparePassengers)
        }
        return this;
    }

    filterBySize(){
        if(this.query.size){
            this.cars = this.cars.filter(c=>c.type==this.query.size)
        }
        return this;
    }
}