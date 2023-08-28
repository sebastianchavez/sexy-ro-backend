import { RagnarokServer } from "src/ragnarok-server/entities/ragnarokserver.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn('increment')
    idEvent: number

    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    type: string;
    
    @Column()
    days: number;
    
    @Column()
    startHour: number;
    
    @Column()
    endHour: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
      })
      createdAt: Date;
    
      @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
      })
      updatedAt: Date;

      @ManyToOne(() => RagnarokServer, (s) => s.idServer)
      @JoinColumn({ name: 'idServer' })
      idServer: number;
}