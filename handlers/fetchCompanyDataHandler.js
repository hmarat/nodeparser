import chalk from "chalk"

const fetchCompanyDataHandler = ($) => {
    const supervisor = $("ul.contactInfo>li:nth-child(2) div").text();
    console.log(chalk.blue(supervisor));
    $("ul.contactInfo>li:nth-child(4)>div").each((i, header) => {
        console.log($(header).find("b").text());
        console.log(chalk.yellow("Fillial ---"))
    })
}

export default fetchCompanyDataHandler