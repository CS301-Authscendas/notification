import { Controller, Get } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { NotificationService } from "./notification.service";
import { EmailTemplateType, Notification } from "./notification.entity";

@Controller("notification")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern("send_2FA_token_email")
    sendTwoFaToken(data: Notification) {
        return this.notificationService.sendMessageEvent(data, EmailTemplateType.TWO_FA);
    }

    @Get()
    healthCheck(): string {
        return this.notificationService.healthCheck();
    }
}
