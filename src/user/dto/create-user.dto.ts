import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @Length(5, 32)
  @IsString()
  username: string;

  @Length(5, 32)
  @IsString()
  password: string;
}
