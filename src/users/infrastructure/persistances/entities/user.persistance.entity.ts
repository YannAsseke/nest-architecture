import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserPersistance {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column({unique : true})
    email : string;

    @Column()
    password : string;
    
}