import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "../../task/entities/task.entity";

interface UserAttr {
  id: number;
  username: string;
  password: string;
  token: string;
}
@Table({ tableName: "user" })
export class User extends Model<User, UserAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;
  @Column({
    type: DataType.STRING(1000),
  })
  token: string;

  @HasMany(() => Task)
  tasks: Task[];
}
