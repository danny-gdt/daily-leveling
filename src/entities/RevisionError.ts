import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { RevisionSession } from "./RevisionSession";

@Entity("revisionErrors")
export class RevisionError {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "question_text" })
    questionText: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @ManyToOne(() => RevisionSession, (session) => session.revisionErrors, { onDelete: "CASCADE" })
    revisionSession: RevisionSession;
}
