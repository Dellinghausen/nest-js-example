import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  public id?: string;

  @Column()
  public name!: string;

  @Column()
  public username!: string;

  @Column()
  public password!: string;

  @Column()
  public createdAt?: Date;

  @Column()
  public updatedAt?: Date;
}
