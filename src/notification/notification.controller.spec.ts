import { Test, TestingModule } from "@nestjs/testing";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

describe("NotificationController", () => {
    let appController: NotificationController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [NotificationController],
            providers: [NotificationService],
        }).compile();

        appController = app.get<NotificationController>(NotificationController);
    });

    describe("root", () => {
        it('should return "Notification service is working!"', () => {
            expect(appController.getHello()).toBe("Notification service is working!");
        });
    });
});
