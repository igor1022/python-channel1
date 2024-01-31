const puppeteer = require('puppeteer');
const express = require('express');
const axios = require('axios');
const server = express();
const PORT = 3500;
const token = "5738212504:AAFQQJq3gZFK_5klpdQiDBnOy_RMurPzOds";
const chat_id = "-1002046109803";
const uri_api = `https://api.telegram.org/bot${ token }/sendMessage`;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--disable-web-security'
    ]
  });

  const page = await browser.newPage();
  
  await page.setRequestInterception(true);
  
  page.on('request', (request) => {
    if (request.url().includes('cs.pikabu.ru')) {
      const url = new URL(request.url());
      url.protocol = 'http';
      url.host = '5.187.0.220';

      request.continue({
        url: url.toString(),
        headers: {
          referer: 'cs.pikabu.ru',
        }
      });
    } else {
      request.continue();
    }
  });

  await page.goto('https://www.iaai.com/search?url=rQT4IG5nOqYgf3cDLeKJm5RFVab76QENM4w9q0mvV9w%3d', {
    timeout: 0,
    waitUntil: ['networkidle0', 'load']
  });

  await page.waitForTimeout(1000);
  //await page.screenshot({path: 'example.png'});
  

  async function fetchProductList(page) {
    const allNumbers = [];
    for (let i = 1; i <= 100; i++) {
      allNumbers.push(i);
    }
    
    for(j of allNumbers) {
      const img = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--image.js-intro-Thumbnail > a > img`);
      //console.log(await img.evaluate(x => x.getAttribute('data-src')));
      const elem0 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell.table-cell--heading > h4.heading-7.rtl-disabled > a`);
      const elem1 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(1) > ul > li:nth-child(1) > span.data-list__value`);
      const elem2 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(1) > ul > li:nth-child(2) > span`);
      const elem3 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(1) > ul > li:nth-child(4) > span`);
      const elem4 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(1) > ul > li:nth-child(5) > span`);
      const elem5 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(2) > ul > li:nth-child(1) > span`);
      const elem6 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(2) > ul > li:nth-child(5) > span`);
      const elem7 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(3) > ul > li:nth-child(2) > span`);
      const elem8 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(3) > ul > li:nth-child(4) > span:nth-child(2)`);
      const elem9 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(4) > ul > li.data-list__item.d-block > span > a`);
      const elem10 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(4) > ul > li:nth-child(2) > span`);
      const elem11 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(4) > ul > li:nth-child(3) > span`);
      const elem12 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(4) > ul > li:nth-child(4) > span.data-list__value`);
      const elem13 = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(4) > ul > li:nth-child(8) > span.data-list__value`);
      
      await axios.post(uri_api, {
        chat_id : chat_id,
        parse_mode : 'html',
        text: `${await img.evaluate(x => x.getAttribute('data-src'))} __ ${await elem0.evaluate(x => x.innerHTML)}
              __${await elem1.evaluate(x => x.innerHTML)} __ ${await elem2.evaluate(x => x.innerHTML)} 
              __${await elem3.evaluate(x => x.innerHTML)} __ ${await elem4.evaluate(x => x.innerHTML)}
              __${await elem5.evaluate(x => x.innerHTML)} __${await elem6.evaluate(x => x.innerHTML)}
              __${await elem7.evaluate(x => x.innerHTML)} __${await elem8.evaluate(x => x.innerHTML)}
              __${await elem9.evaluate(x => x.innerHTML)} __${await elem10.evaluate(x => x.innerHTML)}           `
      })
    }
  }
  const but_numb = [];
  for (let i = 1; i <= 10; i++) {
    but_numb.push(i);
  }
  for (elem of but_numb) {
    const button = await page.$(`#PageNumber${elem}`);
    await button.click();
    await page.waitForTimeout(5000);
    await fetchProductList(page);
  }
  await browser.close();
})();

  