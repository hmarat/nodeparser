import chalk from "chalk"
import cherio from "cherio"

import { getPageContent } from "../helpers/puppeteer"
import fetchCompanyDetailDataHandler from "./fetchCompanyDataHandler"
import saveData from "./saver"

const listItemsHandler = async (data) => {
    try {
        const companies = [];
        for (const initialData of data) {
            //console.log(`Getting data from: ${chalk.green.bold(initialData.url)}`);
            const detailContent = await getPageContent(`https://www.spyur.am${initialData.url}`);
            const $ = cherio.load(detailContent);

            const company = fetchCompanyDetailDataHandler($);

            companies.push(company);
            //console.log(chalk.blue.bold("Done!"))
        }

        saveData(companies);
    } catch (err) {
        throw err;
    }
}

export default listItemsHandler;