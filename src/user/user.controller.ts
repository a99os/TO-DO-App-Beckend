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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserGuard } from "../guards/user.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  @Post("login")
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
