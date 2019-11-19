import chalk from "chalk"
import cherio from "cherio"

import { filterPhoneTitle } from "../helpers/filters"
import { getListInfoType } from "../helpers/common"
import saveDataHandler from "./saver"

const fetchCompanyDataHandler = ($) => {
    $("ul.contactInfo>li").each((i, header) => { // Fetching data from every list item
        //.const filialTitle = $(header).find("b").text();
        const type = getListInfoType($(header).attr("class"), $(header).text())

        if (type === "supervisor") {
            const supervisor = $(`ul.contactInfo>li:nth-child(${i + 2})>div`).text(); // Getting supervisor of company
            console.log(chalk.blue(supervisor));
        } else if (type === "addressPhone") {
            $(`ul.contactInfo>li:nth-child(${i + 2})>div`).each((index, item) => { // Get data from every fillial
                if (index === 4) { // get data only from 1 fillial, for test
                    const $filial = cherio.load($(item).html());
                    const phoneNumbers = [];

                    $filial("div:has(a.call)").each((i, header) => { // Picking all numbers of fillial
                        const callTitle = filterPhoneTitle($filial(header).children()[0].prev.data);
                        const numbers = [];

                        $filial(header).find("a.call").each((i, call) => {
                            numbers.push({
                                number: $filial(call).text(),
                                type: $filial(header).children()[0].next ? $filial(header).children()[0].next.data : null
                            });
                        })

                        phoneNumbers.push({
                            title: callTitle,
                            numbers
                        })
                    })
                    saveDataHandler($(item).contents().filter(function a() { this.nodeType === 3 }).text())
                }

            })
        }
    })
}

export default fetchCompanyDataHandler