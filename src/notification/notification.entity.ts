import { IsEmail, IsString } from "class-validator";

export class Notification {
    @IsEmail()
    @IsString()
    userId: string;

    @IsString()
    message: string;
}
