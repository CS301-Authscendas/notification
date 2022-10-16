import { Injectable, Logger } from "@nestjs/common";
import { EmailTemplateType, Notification } from "./notification.entity";

import AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

@Injectable()
export class NotificationService {
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
        const templatePromise = new AWS.SES({ apiVersion: "2010-12-01" }).getTemplate({ TemplateName: type }).promise();

        // Handle promise's fulfilled/rejected states
        templatePromise
            .then((temp: AWS.SES.GetTemplateResponse) => Logger.log(temp.Template?.SubjectPart))
            .catch((err: AWS.AWSError) => Logger.error(err, err.stack));

        const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendTemplatedEmail(params).promise();
        sendPromise
            .then((temp: AWS.SES.SendTemplatedEmailResponse) => {
                Logger.log("Email sent");
                Logger.log(temp);
            })
            .catch((err: AWS.AWSError) => Logger.error(err, err.stack));
    }

    healthCheck(): string {
        return "Notification service is healthy";
    }
}
