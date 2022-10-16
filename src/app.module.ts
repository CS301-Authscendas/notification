import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { NotificationModule } from "./notification/notification.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), NotificationModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
