import cherio from "cherio"
import chalk from "chalk"
import { slugify } from "transliteration"

import { arrayFromLength } from "./helpers/common"
import { getPageContent } from "./helpers/puppeteer"
import listItemsHandler from "./handlers/listItemsHandler"

const pages = 2;

(async () => {
    try {
        for (const page of arrayFromLength(pages)) {
            const url = `https://www.spyur.am/ru/home/search-${page}/?addres=Arcax`;
            const pageContent = await getPageContent(url);
            const $ = cherio.load(pageContent);
            const carsItems = [];

            $(".firms_title").each((i, header) => {
                const url = $(header).attr("href");
                const title = $(header).text().trim().replace('"', "");

                carsItems.push({
                    title,
                    url,
                    code: slugify(title)
                })
            })

            await listItemsHandler(carsItems);
        }
    } catch (err) {
        console.log(chalk.red("Ann error has occured\n"));
        console.log(err);
    }
})()