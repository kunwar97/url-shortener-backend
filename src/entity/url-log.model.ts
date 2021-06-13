import { BaseEntity, Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class UrlLog extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @ObjectIdColumn()
    url_id: ObjectID;

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;

    @Column()
    ip_address: string;

    @Column()
    user_agent: string;
}
