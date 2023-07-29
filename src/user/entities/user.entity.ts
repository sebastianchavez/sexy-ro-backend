import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    idUser: string;

    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;

    @Column()
    state: string; // enabled, disabled

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