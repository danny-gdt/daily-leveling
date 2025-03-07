import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User"
import { RevisionSession } from "../entities/RevisionSession";
import { RevisionError } from "../entities/RevisionError";
import { Source } from "../entities/Source";
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // ⚠️ Mettre à false en production et utiliser des migrations TODO
    logging: false,
    entities: [__dirname + "/../entities/*.ts"],
    migrations: [__dirname + "/../migrations/*.ts"],
});

