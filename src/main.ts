import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const method = configService.get("RABBITMQ_TRANSPORT_METHOD");
    const user = configService.get("RABBITMQ_USER");
    const password = configService.get("RABBITMQ_PASSWORD");
    const host =
        process.env.NODE_ENV === "production"
            ? configService.get("RABBITMQ_PROD_HOST")
            : configService.get("RABBITMQ_HOST");
    const port = configService.get("RABBITMQ_PORT");
    const queueName = configService.get("RABBITMQ_QUEUE_NAME");

    const ms = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [`${method}://${user}:${password}@${host}:${port}`],
            queue: queueName,
            queueOptions: {
                durable: true,
            },
        },
    });

    app.startAllMicroservices();
    await ms.listen();
}
bootstrap();
