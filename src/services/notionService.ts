import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config();

const notionService = new Client({ auth: process.env.NOTION_API_KEY });

const getChildrenRecursively = async (blockId: string): Promise<string[]> => {
    try {
        const response = await notionService.blocks.children.list({ block_id: blockId });
        const blocks = response.results;
        let textContent: string[] = [];

        for (const block of blocks) {
            if ("type" in block) {
                // Récupérer le texte selon le type de bloc
                const text = extractTextFromBlock(block);
                if (text) textContent.push(text);

                // Si le bloc a des enfants (ex: toggle, bullet list), récupérer récursivement
                if ("has_children" in block && block.has_children) {
                    const childrenText = await getChildrenRecursively(block.id);
                    textContent.push(...childrenText);
                }
            }
        }

        return textContent;
    } catch (error) {
        console.error(`❌ Erreur lors de la récupération des enfants de ${blockId}:`, error);
        return [];
    }
};

// 📝 Fonction pour extraire le texte d'un bloc Notion
const extractTextFromBlock = (block: any): string | null => {
    if (!("type" in block)) return null;

    const type = block.type;
    if (!block[type] || !block[type].rich_text) return null;

    return block[type].rich_text.map((rt: any) => rt.plain_text).join(" ");
};

// 🔥 Fonction principale pour récupérer le texte d'une page Notion
export const getPageTextContent = async (pageId: string): Promise<string> => {
    const textArray = await getChildrenRecursively(pageId);
    return textArray.join("\n"); // Joindre les lignes en un seul texte brut
};
