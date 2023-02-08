import { IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @Length(5, 32)
  @IsString()
  username: string;
  @IsOptional()
  @Length(5, 32)
  @IsString()
  password: string;
}
