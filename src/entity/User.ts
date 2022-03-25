import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

}


