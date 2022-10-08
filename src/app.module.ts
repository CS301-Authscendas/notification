import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NotificationController } from "./notification/notification.controller";
import { NotificationModule } from "./notification/notification.module";
import { NotificationService } from "./notification/notification.service";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), NotificationModule],
    controllers: [AppController, NotificationController],
    providers: [AppService, NotificationService],
})
export class AppModule {}
