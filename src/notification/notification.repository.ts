import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { config } from "src/app.config";

@Injectable()
export class NotificationRepository {
    private tableName: string;
    private db: DocumentClient;

    private notificationPrefix = "NOTIFICATION#";

    constructor() {
        AWS.config.update(config.aws_remote_config);
        this.tableName = "notification";
        this.db = new AWS.DynamoDB.DocumentClient();
    }
}
