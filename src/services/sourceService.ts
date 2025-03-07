import { AppDataSource } from "../database/data-source";
import { Source } from "../entities/Source";
import { User } from "../entities/User";

interface SaveSourceParams {
    userId: number;
    type: "notionPage" | "pdf" | "other"; // Définir les types possibles
    content?: any;
}

export const saveSource = async ({ userId, type, content }: SaveSourceParams): Promise<Source> => {
    const sourceRepository = AppDataSource.getRepository(Source);
    const userRepository = AppDataSource.getRepository(User);

    // Vérifier si l'utilisateur existe
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    // Créer et sauvegarder la source
    const source = sourceRepository.create({ type, user, content });
    return await sourceRepository.save(source);
};
