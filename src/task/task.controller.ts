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

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.taskService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.taskService.remove(+id);
  }
}
