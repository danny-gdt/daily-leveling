import { AppDataSource} from "./database/data-source";
import { getPageTextContent } from "./services/notionService";
import { saveSource } from "./services/sourceService";
import * as dotenv from "dotenv";
import {Source} from "./entities/Source";
import {User} from "./entities/User";

dotenv.config();
AppDataSource.initialize()
    .then(async () => {
        console.log("📦 Database connected successfully!");
        const user = await AppDataSource.getRepository(User).findOne({where: {id: 1}})
        const pageContent = await getPageTextContent(notionPageId);
        if (pageContent) {
            await saveSource({ userId: Number(process.env.DEFAULT_USER_ID) , type: "notionPage", content: {data: pageContent} });
        }
    })
    .catch((error) => console.log(error))

const notionPageId = "17cb03a8369280c28112d8e5b0c20344"; // CKAD


/*


*/


