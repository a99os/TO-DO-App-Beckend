import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  // register
  // login
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const oldUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (oldUser)
      throw new HttpException("Username already exist", HttpStatus.BAD_REQUEST);
    const user = await this.userRepository.create(createUserDto);
    const token = await this.getToken(user.id);
    user.token = token;
    await user.save();
    return { user, token };
  }
  async login(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (!user) throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);

    if (createUserDto.password !== user.password)
      throw new ForbiddenException("Acces Denied");
    const token = await this.getToken(user.id);
    user.token = token;
    await user.save();
    return { user, token };
  }

  async getToken(user_id: number) {
    const jwtPayload = {
      sub: user_id,
    };
    const accessToken = this.jwtService.signAsync(jwtPayload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    return accessToken;
  }

  async verifyToken(token: string) {
    const user = this.jwtService.verify(token, {
      secret: process.env.ACCESS_TOKEN_KEY,
    });
    if (!user.sub) {
      throw new UnauthorizedException({
        message: "Unauthorized User",
      });
    }
    return user.sub;
  }

  async findAll() {
    console.log(this.userRepository);
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(updateUserDto, { where: { id } });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.destroy({ where: { id } });
    return user;
  }
}
