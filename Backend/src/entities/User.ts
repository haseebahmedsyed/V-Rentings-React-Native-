import {Entity,BaseEntity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm'
import { Rent } from './Rents'
import { Car } from './Car'

@Entity('user')
export class User extends BaseEntity{   
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column({
        unique:true
    })
    phone:string

    @Column({
        unique:true
    })
    email:string

    @Column()
    password:string

    @Column()
    address:string

    @OneToMany(()=>Rent , rent=>rent.user)
    rents:Rent[]

    @OneToMany(()=>Car,car=>car.user)
    cars:Car[]


}