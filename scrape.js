const { chromium } = require('playwright');

async function scrape() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const seeds = [53,54,55,56,57,58,59,60,61,62];
    let grandTotal = 0;

    for (let seed of seeds) {
        const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
        
        await page.goto(url);
        await page.waitForSelector("table");

        const numbers = await page.$$eval("table td", cells =>
            cells
                .map(td => parseFloat(td.innerText))
                .filter(num => !isNaN(num))
        );

        const pageSum = numbers.length
            ? numbers.reduce((a,b) => a + b, 0)
            : 0;

        console.log(`Seed ${seed} sum = ${pageSum}`);
        grandTotal += pageSum;
    }

    console.log("FINAL TOTAL =", grandTotal);

    await browser.close();
}

scrape();