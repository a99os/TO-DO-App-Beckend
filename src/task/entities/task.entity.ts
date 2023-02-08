import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";

interface TaskAttr {
  title: string;
  status: boolean;
  user_id: number;
  // expiring_date: Date;
}
@Table({ tableName: "task" })
export class Task extends Model<Task, TaskAttr> {
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
  title: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;

  @Column({
    type: DataType.BIGINT,
  })
  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User)
  user: User;
  // @Column({
  //   type: DataType.DATE,
  // })
  // expiring_date: Date;
}
