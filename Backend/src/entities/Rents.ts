import {Entity,BaseEntity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn} from 'typeorm'
import {User}  from './User'
import { Car } from './Car'

@Entity('rent')
export class Rent extends BaseEntity{   
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=>User , user=>user.rents,{
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'user_id'})
    user:User

    @Column()
    startDate:string

    @Column()
    endDate:string

    @Column()
    car_id:string  

    @Column()
    rentPrice:number

    @Column()
    days:number

    @ManyToOne(()=>Car,car=>car.rents,{
            onDelete:'CASCADE'
    })
    car:Car



}