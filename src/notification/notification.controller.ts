import { Controller, Get } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { NotificationService } from "./notification.service";
import { Notification } from "./notification.entity";

import AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

@Controller("notification")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    // @EventPattern("send_email_notification")
    @EventPattern()
    async handleSendMessageEvent(data: Notification) {
        // console.log(data.email);
        // console.log(data.type);
        // console.log(data.name);
        // console.log(data.code);

        const params = {
            Destination: {
                ToAddresses: [data.email],
            },
            Source: "Authcendas <authcendas@gmail.com>",
            Template: data.type,
            TemplateData: `{ "name": "${data.name}", "code":"${data.code}"}`,
        };

        // Create the promise and Amazon Simple Email Service (Amazon SES) service object.
        const templatePromise = new AWS.SES({ apiVersion: "2010-12-01" })
            .getTemplate({ TemplateName: data.type })
            .promise();

        // Handle promise's fulfilled/rejected states
        templatePromise
            .then(function (data: any) {
                // console.log(data.Template.SubjectPart);
                return data;
            })
            .catch(function (err: any) {
                // console.error(err, err.stack);
                return err;
            });

        const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendTemplatedEmail(params).promise();
        sendPromise
            .then(function (data: any) {
                // console.log("email sent")
                // console.log(data);
                return data;
            })
            .catch(function (err: any) {
                // console.error(err, err.stack);
                return err;
            });
    }

    @Get()
    getHello(): string {
        return this.notificationService.getHello();
    }
}
