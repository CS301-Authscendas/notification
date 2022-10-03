import { Controller, Get } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller("notification")
export class NotificationController {
    constructor(private readonly appService: NotificationService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
