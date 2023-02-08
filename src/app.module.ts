import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user/entities/user.entity";
import { Task } from "./task/entities/task.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    TaskModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Task],
      autoLoadModels: true,
      logging: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
