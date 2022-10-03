import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationService {
    getHello(): string {
        return "Notification service is working!";
    }
}
