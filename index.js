import cherio from "cherio"
import chalk from "chalk"
import { slugify } from "transliteration"

import { arrayFromLength } from "./helpers/common"
import { getPageContent } from "./helpers/puppeteer"
import listItemsHandler from "./handlers/listItemsHandler"

const pages = 34;

(async () => {
    try {
        const companies = [];
        for (const page of arrayFromLength(pages)) {
            const url = `https://www.spyur.am/ru/home/search-${page}/?addres=Arcax`;
            const pageContent = await getPageContent(url);
            const $ = cherio.load(pageContent);
            const firmsItems = [];

            $(".firms_title").each((i, header) => {
                const url = $(header).attr("href");
                const title = $(header).text().trim().replace('"', "");

                firmsItems.push({
                    title,
                    url,
                    code: slugify(title)
                })
            })

            //const companies = await listItemsHandler(firmsItems);
            companies.push(await listItemsHandler(firmsItems))
        }
    } catch (err) {
        console.log(chalk.red("Ann error has occured\n"));
        console.log(err);
    }
})()