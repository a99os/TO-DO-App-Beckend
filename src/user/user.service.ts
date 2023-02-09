import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
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
    if (oldUser) throw new HttpException("Username alreade exist", HttpStatus.NOT_FOUND);
    const user = await this.userRepository.create(createUserDto);
    const tokens = await this.getTokens(user.id);
    user.token = tokens.refresh_token;
    await user.save();
    return { user, tokens };
  }
  async login(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (!user) throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);

    if (createUserDto.password !== user.password)
      throw new ForbiddenException("Acces Denied");
    const tokens = await this.getTokens(user.id);
    user.token = tokens.refresh_token;
    await user.save();
    return { user, tokens };
  }

  async getTokens(user_id: number) {
    const jwtPayload = {
      sub: user_id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
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
