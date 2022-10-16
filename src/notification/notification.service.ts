import { Injectable, Logger } from "@nestjs/common";
import { EmailTemplateType, Notification } from "./notification.entity";
import { SES } from "aws-sdk";

@Injectable()
export class NotificationService {
    private ses: SES;

    constructor() {
        this.ses = new SES({
            region: process.env.AWS_SES_REGION || "",
        });
    }

    async sendMessageEvent(data: Notification, type: EmailTemplateType) {
        Logger.log(data.email);
        Logger.log(data.name);
        Logger.log(data.code);

        const params = {
            Destination: {
                ToAddresses: [data.email],
            },
            Source: "Authcendas <authcendas@gmail.com>",
            Template: type,
            TemplateData: `{"name": "${data.name}", "code": "${data.code}"}`,
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
