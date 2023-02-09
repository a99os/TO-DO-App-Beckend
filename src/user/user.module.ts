import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { Task } from "../task/entities/task.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([User, Task]), JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
