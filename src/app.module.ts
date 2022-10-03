import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NotificationController } from "./notification/notification.controller";
import { NotificationModule } from "./notification/notification.module";
import { NotificationService } from "./notification/notification.service";

@Module({
    imports: [NotificationModule],
    controllers: [AppController, NotificationController],
    providers: [AppService, NotificationService],
})
export class AppModule {}
