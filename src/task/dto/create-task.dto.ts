import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
