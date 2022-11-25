import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeUpdate,
    BeforeInsert,
    BaseEntity,
} from 'typeorm'
import bcrypt from 'bcrypt'

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    googleId: string

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async isValidPassword(password: string) {
        return await bcrypt.compare(password, this.password)
    }
}
