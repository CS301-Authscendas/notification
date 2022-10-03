import { Attribute, Entity, AutoGenerateAttribute, AUTO_GENERATE_ATTRIBUTE_STRATEGY } from "@typedorm/common";

@Entity({
    name: "notification",
    primaryKey: {
        partitionKey: "NOTIFICATION#{{id}}",
        sortKey: "NOTIFICATION#{{id}}",
    },
})
export class Notification {
    @AutoGenerateAttribute({
        strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    id: string;

    @Attribute()
    userId: string[];

    @Attribute()
    content: string;

    @Attribute()
    read: boolean;

    @Attribute()
    createdAt: number;
}
