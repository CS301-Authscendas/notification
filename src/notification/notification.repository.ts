import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class NotificationRepository {
    private tableName: string;
    private db: DocumentClient;

    private notificationPrefix = "NOTIFICATION#";

    constructor() {
        const configService = new ConfigService();
        AWS.config.update({
            accessKeyId: configService.get("ACCESS_KEY_ID"),
            secretAccessKey: configService.get("SECRET_ACCESS_KEY"),
            region: configService.get("DYNAMO_REGION"),
        });
        this.tableName = "notification";
        this.db = new AWS.DynamoDB.DocumentClient();
    }
}
