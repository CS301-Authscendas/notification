import { Attribute } from "@typedorm/common";
import { IsEmail } from "class-validator";

export class Notification {
    @Attribute()
    @IsEmail()
    userId: string;

    @Attribute()
    message: string;
}
