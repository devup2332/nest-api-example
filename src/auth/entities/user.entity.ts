import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity({ name: 'Users' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ nullable: true, enum: ['form', 'google', 'facebook'] })
  authStrategy?: 'form' | 'google' | 'github';
}
