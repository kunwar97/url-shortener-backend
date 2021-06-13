import { Entity, ObjectIdColumn, Column, BaseEntity} from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class User extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    first_name: string;

    @Column({
        nullable: true
    })
    last_name?: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        select: false,
    })
    password: string;
}
