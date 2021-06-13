import { BaseEntity, Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class Url extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    original_url: string;

    @Column()
    url_code: string;

    @ObjectIdColumn()
    user_id: ObjectID;

    @Column({type: "timestamp", nullable: true})
    expiry_time: string;

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;

}
