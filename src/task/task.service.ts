import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.create(createTaskDto);
  }

  async findAll() {
    console.log(this.taskRepository);
    return await this.taskRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(updateTaskDto, { where: { id } });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    await this.taskRepository.destroy({ where: { id } });
    return task;
  }
}
