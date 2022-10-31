import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity('users')
export class Users {
        1
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name', nullable: false })
    name: string

    @Column({ name: 'email', nullable: false })
    email: string

    @Column({ name: 'password', nullable: false })
    password: string

    constructor() {
        if (!this.id) this.id = uuid()
    }
}