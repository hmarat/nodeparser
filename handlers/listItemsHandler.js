import chalk from "chalk"
import cherio from "cherio"

import { getPageContent } from "../helpers/puppeteer"
import fetchCompanyDetailDataHandler from "./fetchCompanyDataHandler"

const listItemsHandler = async (data) => {
    try {
        for (const initialData of data) {
            console.log(`Getting data from: ${chalk.green.bold(initialData.url)}`);
            const detailContent = await getPageContent(`https://www.spyur.am${initialData.url}`);
            const $ = cherio.load(detailContent);
            
            fetchCompanyDetailDataHandler($);

            console.log(chalk.blue.bold("Done!"))
        }
    } catch (err) {
        throw err;
    }
}

export default listItemsHandler;