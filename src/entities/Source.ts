import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "./User";

@Entity("sources")
export class Source {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    type: string; // ex: "notionPage", "pdf"

    @ManyToOne(() => User, (user) => user.sources, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "jsonb", nullable: true })
    content: any;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt?: Date;
}