import { IsEmail, IsString, IsOptional } from "class-validator";

export enum EmailTemplateType {
    ACCOUNT_READY = "Account_ready_email_template",
    REGISTER = "Register_email_template",
    TWO_FA = "Twofa_email_template",
    LOGIN = "Login_email_template",
}

export class Notification {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    code: string;
}
