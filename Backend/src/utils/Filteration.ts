import { Car } from "../entities/Car";

export class Fiteration{
    constructor(public cars:Car[],public query:any){
    }

     comparePrice( a : Car, b:Car ) {
        if ( a.price < b.price ){
          return -1;
        }
        if ( a.price > b.price ){
          return 1;
        }
        return 0;
      }

     compareRating( a : Car, b:Car ) {
        if ( Number(a.rating) < Number(b.rating)){
          return -1;
        }
        if (  Number(a.rating) >  Number(b.rating) ){
          return 1;
        }
        return 0;
      }

    sortByPrice():this{
        if(this.query.sortPrice=='true'){
            this.cars.sort( this.comparePrice );
        }
        return this;
    }

    sortByRating():this{
        if(this.query.sortRating=='true'){
            this.cars.sort( this.compareRating).reverse();
        }
        return this
    }
}