import { Injectable, Logger } from "@nestjs/common";
import { EmailTemplateType, Notification } from "./notification.entity";
import { AWSError, SES } from "aws-sdk";

@Injectable()
export class NotificationService {
    private ses: SES;

    constructor() {
        this.ses = new SES({
            region: process.env.AWS_SES_REGION || "",
        });
    }

    sendMessageEvent(data: Notification, type: EmailTemplateType) {
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

        // Create the promise and Amazon Simple Email Service (Amazon SES) service object.
        const templatePromise = this.ses.getTemplate({ TemplateName: type }).promise();

        // Handle promise's fulfilled/rejected states
        templatePromise
            .then((temp: SES.GetTemplateResponse) => Logger.log(temp.Template?.SubjectPart))
            .catch((err: AWSError) => Logger.error(err, err.stack));

        const sendPromise = this.ses.sendTemplatedEmail(params).promise();
        sendPromise
            .then((temp: SES.SendTemplatedEmailResponse) => {
                Logger.log("Email sent");
                Logger.log(temp);
            })
            .catch((err: AWSError) => Logger.error(err, err.stack));
    }

    getHello(): string {
        return "Notification service is working!";
    }
}
