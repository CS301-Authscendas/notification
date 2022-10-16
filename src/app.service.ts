import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    healthCheck(): string {
        return "Notification service is healthy";
    }
}
