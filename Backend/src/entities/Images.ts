import { Entity,BaseEntity,Column,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Car } from "./Car";

@Entity('image')
export class Image extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    public_id:string

    @Column()
    url:string

    @ManyToOne(()=>Car,car=>car.images,{
        onDelete:'CASCADE'
    })
    car:Car
}