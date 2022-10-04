import { Controller, Get } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { NotificationService } from "./notification.service";

@Controller("notification")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    // TODO: Add in corresponding event name - e.g. @EventPattern(send_email_notification)
    @EventPattern()
    async handleSendMessageEvent(data: Record<string, unknown>) {
        // TODO: Implement handler function.
        console.log(data);
    }

    @Get()
    getHello(): string {
        return this.notificationService.getHello();
    }
}
