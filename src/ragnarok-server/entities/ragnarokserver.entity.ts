import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity('server')
export class RagnarokServer {
    @PrimaryGeneratedColumn('increment')
    idServer: number;

    @Column()
    name: string;
    
    @Column()
    description: string;
}