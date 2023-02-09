import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserService } from "../user/user.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private readonly userService: UserService
  ) {}
  async create(createTaskDto: CreateTaskDto, access_token: string) {
    const user_id = await this.userService.verifyToken(access_token);
    
    return await this.taskRepository.create({ user_id, ...createTaskDto });
  }

  async findAll(access_token: string) {
    const user_id = await this.userService.verifyToken(access_token);
    
    return await this.taskRepository.findAll({
      where: { user_id },
      include: { all: true },
    });
  }

  async findOne(id: number, access_token: string) {
    const user_id = await this.userService.verifyToken(access_token);
    
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (task.user_id !== user_id) {
      throw new HttpException("Acces Denied", HttpStatus.FORBIDDEN);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, access_token: string) {
    const user_id = await this.userService.verifyToken(access_token);
    
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (task.user_id !== user_id) {
      throw new HttpException("Acces Denied", HttpStatus.FORBIDDEN);
    }
    await this.taskRepository.update(updateTaskDto, { where: { id } });
    return await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async remove(id: number, access_token: string) {
    const user_id = await this.userService.verifyToken(access_token);
    
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (task.user_id !== user_id) {
      throw new HttpException("Acces Denied", HttpStatus.FORBIDDEN);
    }
    await this.taskRepository.destroy({ where: { id } });
    return task;
  }
}
