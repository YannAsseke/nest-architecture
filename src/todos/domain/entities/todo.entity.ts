import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('todos')
export class Todo {

    @PrimaryGeneratedColumn()
    readonly id : number;

    @Column()
    title : string;

    @Column()
    description: string ;

    @Column({default : false})
    status : boolean

}