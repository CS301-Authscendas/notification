import { IsEmail, IsString } from "class-validator";

enum EmailTemplateType {
    ACCOUNT_READY = "Account_ready_email_template",
    REGISTER = "Register_email_template",
    TWO_FA = "twofa_email_template",
}

export class Notification {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    type: EmailTemplateType;

    @IsString()
    name: string;

    @IsString()
    code: string;
}
