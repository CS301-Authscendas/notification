import { Controller, Get } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { NotificationService } from "./notification.service";
import { Notification } from "./notification.entity";

@Controller("notification")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    // @EventPattern("send_email_notification")
    @EventPattern()
    async handleSendMessageEvent(data: Notification) {
        return await this.notificationService.handleSendMessageEvent(data);
    }

    @Get()
    getHello(): string {
        return this.notificationService.getHello();
    }
}
