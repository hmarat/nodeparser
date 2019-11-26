import chalk from "chalk"
import cherio from "cherio"

import { filterPhoneTitle, filterPhoneNumberType, isSpanOldAddress, getWorkingDays, isRegion } from "../helpers/filters"
import { getListInfoType } from "../helpers/common"
import saveData from "./saver"

const fetchCompanyDataHandler = ($) => {
    const company = {};

    $("ul.contactInfo>li").each((i, header) => { // Fetching data from every list item
        //.const filialTitle = $(header).find("b").text();
        const type = getListInfoType($(header).attr("class"), $(header).text())

        if (type === "supervisor") {
            const supervisor = $(`ul.contactInfo>li:nth-child(${i + 2})>div`).text().trim(); // Getting supervisor of company
            company.supervisor = supervisor;
            console.log(chalk.blue(`supervisor: ${supervisor}`));
        } else if (type === "addressPhone") {
            $(`ul.contactInfo>li:nth-child(${i + 2})>div`).each((index, item) => { // Get data from every fillial
                    const $filial = cherio.load($(item).html());
                    const filial = {};
                    const phoneNumbers = [];

                    $filial("div:has(a.call)").each((i, header) => { // Getting all numbers of fillial
                        const callTitle = filterPhoneTitle($filial(header).children()[0].prev.data);
                        const numbers = [];

                        $filial(header).find("a.call").each((i, call) => {
                            numbers.push({
                                number: $filial(call).text(),
                                type: filterPhoneNumberType($filial(header).children()[0].next)
                            });
                        })

                        phoneNumbers.push({
                            title: callTitle,
                            numbers
                        })
                    }) // Ending getting phone numbers
                    
                    filial.phoneNumbers = phoneNumbers;
                    saveData(phoneNumbers)

                    //Getting addres of filial
                    const address = {};

                    const textNodes = $filial(item).contents().filter(function (i, node) {
                        return this.nodeType === 3 && $filial(node).text().trim().length > 0;
                    })

                    const oldAddress = $filial("span[title]") && isSpanOldAddress($filial("span[title]").attr("title")) && $filial("span[title]").text().trim();
                    if(textNodes.length === 3){
                        if(!oldAddress){
                            throw new Error("textnodes length is 3 but has not span tag");
                        }
                        address.regionAndCity = $filial(textNodes[0]).text().trim();
                        address.address = $filial(textNodes[1]).text().trim() + oldAddress + $filial(textNodes[2]).text().trim();
                    }
                    else if (textNodes.length === 2) {
                        address.regionAndCity = $filial(textNodes[0]).text().trim();
                        address.address = oldAddress ? oldAddress.concat($filial(textNodes[1]).text().trim()) : $filial(textNodes[1]).text().trim();
                    } else if (textNodes.length === 1) {
                        const regionAndCity = $filial(textNodes[0]).text().trim();
                    }
                    else {
                        console.log(`Length: ${textNodes.length}`);
                        console.log($filial(textNodes[0]).text());
                        console.log($filial(textNodes[1]).text());
                        console.log($filial(textNodes[2]).text());
                        throw new Error("textNodes length is not 3, 2 or 1");
                    }
                    console.log(chalk.red("address)"), address);
                    filial.address = address;
                    // End getting address of filial

                    //get working days
                    $filial("div").each((i, div) => {
                        const text = $filial(div).text().trim();
                        const workingDaysRules = getWorkingDays(text);
                        if(workingDaysRules){
                            filial.workingDaysRules = workingDaysRules;
                            return false;
                        }
                    })
                    //end getting working days

                    //Get region, if contains
                    $filial("div").each((i, div) =>{
                        const text = $filial(div).text().trim();
                        const isDivRegion = isRegion(text);

                        if(isDivRegion){
                            filial.region = text.slice(1, text.length - 1);
                            console.log(`Region: ${text.slice(1, text.length - 1)}`);
                            return false;
                        }
                    })
            })
        }
        else if(type === "otherPhoneContacts"){
            
        }
    })
}

export default fetchCompanyDataHandler