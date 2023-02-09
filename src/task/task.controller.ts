import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { UserGuard } from "../guards/user.guard";
import { IdGetterUser } from "../decorators/getIdbyAccessToken";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(UserGuard)
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @IdGetterUser() access_token: string
  ) {
    return this.taskService.create(createTaskDto, access_token);
  }

  @UseGuards(UserGuard)
  @Get()
  findAll(@IdGetterUser() access_token: string) {
    return this.taskService.findAll(access_token);
  }

  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @IdGetterUser() access_token: string) {
    return this.taskService.findOne(+id, access_token);
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @IdGetterUser() access_token: string
  ) {
    return this.taskService.update(+id, updateTaskDto, access_token);
  }

  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @IdGetterUser() access_token: string) {
    return this.taskService.remove(+id, access_token);
  }
}
