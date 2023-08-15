import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}