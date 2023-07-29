import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn('increment')
    idAccount: number;

    @Column()
    ragnarokId: number;

    @Column()
    genre: string; // F, M

    @ManyToOne((type) => User, (u) => u.idUser)
    @JoinColumn({ name: 'idUser' })
    idUser: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updatedAt: Date;
}