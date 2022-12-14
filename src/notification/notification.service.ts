import { Injectable, Logger } from "@nestjs/common";
import { SES } from "aws-sdk";
import { EmailTemplateType, Notification } from "./notification.entity";

@Injectable()
export class NotificationService {
    private ses: SES;

    constructor() {
        this.ses = new SES({
            region: process.env.AWS_SES_REGION || "",
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        });
    }

    async sendMessageEvent(data: Notification, type: EmailTemplateType) {
        Logger.log(data.email);
        Logger.log(data.name);
        Logger.log(data.id);
        Logger.log(data.code);
        Logger.log(data.organizationId);

        const params = {
            Destination: {
                ToAddresses: [data.email],
            },
            Source: "Authcendas <authcendas@gmail.com>",
            Template: type,
            TemplateData: `{"name": "${data.name}", "id": "${data.id}", "code": "${data.code}", "organizationId": "${data.organizationId}"}`,
        };

        try {
            const templatePromise = await this.ses.getTemplate({ TemplateName: type }).promise();
            Logger.log(templatePromise.Template?.SubjectPart);

            const sendPromise = await this.ses.sendTemplatedEmail(params).promise();
            Logger.log("Email sent");
            Logger.log(sendPromise);
        } catch (err) {
            Logger.error(err);
        }
    }

    getHello(): string {
        return "Notification service is working!";
    }
}
