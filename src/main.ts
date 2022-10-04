import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const user = configService.get("RABBITMQ_USER");
    const password = configService.get("RABBITMQ_PASSWORD");
    const host = configService.get("RABBITMQ_HOST");
    const port = configService.get("RABBITMQ_PORT");
    const queueName = configService.get("RABBITMQ_QUEUE_NAME");

    const ms = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`],
            queue: queueName,
            queueOptions: {
                durable: true,
            },
        },
    });

    // TODO: Figure out why the AMQP microservice is not started without listen().
    app.startAllMicroservices();
    await ms.listen();
}
bootstrap();
