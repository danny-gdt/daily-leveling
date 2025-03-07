import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { RevisionError } from "./RevisionError";

@Entity("revisionSessions")
export class RevisionSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({ name: "duration_minutes", nullable: true })
    durationMinutes: number;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.revisionSessions, { onDelete: "CASCADE" })
    user: User;

    @OneToMany(() => RevisionError, (error) => error.revisionSession)
    revisionErrors: RevisionError[];
}
