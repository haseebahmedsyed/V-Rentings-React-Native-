import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,OneToMany} from 'typeorm'
import { Rent } from './Rents'
import { User } from './User'
import { Image } from './Images'

export enum Transmission {
    Automatic = "Automatic",
    Manual = "Manual"
}

@Entity('car')
export class Car extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    passengers: number

    @Column()
    bags: number

    @Column()
    price: number

    @Column()
    rating: string

    @OneToMany(()=>Rent,rent=>rent.car)
    rents:Rent[]

    @OneToMany(()=>Image,image=>image.car)
    images:Image[]


    @Column({
        type: 'simple-json'
    })
    location: {
        latitude: string,
        longitude: string
    }

    @Column({
        type: 'enum',
        enum: Transmission,
        default: Transmission.Manual
    })
    transmission: string

    @ManyToOne(() => User, user => user.cars,{
        onDelete:'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User

}