import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Task } from "./entities/task.entity";
import { User } from "../user/entities/user.entity";
import { UserGuard } from "../guards/user.guard";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Task, User]), JwtModule.register({})],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
