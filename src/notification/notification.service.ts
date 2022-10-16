import { Injectable, Logger } from "@nestjs/common";
import { Notification } from "./notification.entity";

import AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

@Injectable()
export class NotificationService {
    async handleSendMessageEvent(data: Notification) {
        Logger.log(data.email);
        Logger.log(data.type);
        Logger.log(data.name);
        Logger.log(data.code);

        const params = {
            Destination: {
                ToAddresses: [data.email],
            },
            Source: "Authcendas <authcendas@gmail.com>",
            Template: data.type,
            TemplateData: `{ "name": "${data.name}", "code": "${data.code}"}`,
        };

        // Create the promise and Amazon Simple Email Service (Amazon SES) service object.
        const templatePromise = new AWS.SES({ apiVersion: "2010-12-01" })
            .getTemplate({ TemplateName: data.type })
            .promise();

        // Handle promise's fulfilled/rejected states
        templatePromise
            .then((temp: any) => Logger.log(temp.Template.SubjectPart))
            .catch((err: Error) => Logger.error(err, err.stack));

        const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendTemplatedEmail(params).promise();
        sendPromise
            .then((temp: any) => {
                Logger.log("email sent");
                Logger.log(temp);
            })
            .catch((err: Error) => Logger.error(err, err.stack));
    }

    getHello(): string {
        return "Notification service is working!";
    }
}
