import puppeteer from "puppeteer"

const getPageContent = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
        const content = await page.content();
        browser.close();

        return content;
    } catch (err) {
        throw err;
    }
}

export { getPageContent }