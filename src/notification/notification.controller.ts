import { Controller, Get } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { NotificationService } from "./notification.service";
import { EmailTemplateType, Notification } from "./notification.entity";

@Controller("notification")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern("send_seeded_email")
    async sendSeededEmail(data: Notification) {
        return this.notificationService.sendMessageEvent(data, EmailTemplateType.ACCOUNT_READY);
    }

    @EventPattern("send_2FA_token_email")
    async sendTwofaEmail(data: Notification) {
        return this.notificationService.sendMessageEvent(data, EmailTemplateType.TWO_FA);
    }

    @EventPattern("send_login_alert_email")
    async sendLoginEmail(data: Notification) {
        return this.notificationService.sendMessageEvent(data, EmailTemplateType.LOGIN);
    }

    @Get()
    getHello(): string {
        return this.notificationService.getHello();
    }
}
