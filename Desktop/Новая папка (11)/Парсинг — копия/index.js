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
  page.setDefaultNavigationTimeout(0);
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

  await page.goto('https://www.iaai.com/Search?url=rQT4IG5nOqYgf3cDLeKJm5RFVab76QENM4w9q0mvV9w%3d', {
    timeout: 0,
    waitUntil: ['networkidle0', 'load']
  });

  await page.waitForTimeout(1000);
  let arr_begin_card = [];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async function fetchProductList(page) {
    const arr_finish_card = [];
    const allNumbers = [];
    const rand = getRandomInt(2) + 1;
    for (let i = rand * 5 - 4; i <= rand * 5; i++) {
      allNumbers.push(i);
    }
    for(j of allNumbers) {
      const img = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--image.js-intro-Thumbnail > a > img`);
      const card = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--image.js-intro-Thumbnail > a`);
      const article_name = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell.table-cell--heading > h4.heading-7.rtl-disabled > a`);
      const price = await page.$(`#ListingGrid > div.table.table-advanced.table--custom-view > div.table-body.border-l.border-r > div:nth-child(${j}) > div > div.table-cell.table-cell--data.p-0 > div.table-cell--inner > div:nth-child(4) > ul > li:nth-child(8) > span.data-list__value`);
      arr_finish_card[j - 1 - 5 * (rand - 1)] = {'id': j - 1 - 5 * (rand - 1),
                              'article_name': await article_name.evaluate(x => x.innerHTML),
                              'img': await img.evaluate(x => x.getAttribute('data-src')),
                              'price': await price.evaluate(x => x.innerHTML),
                              'card': await card.evaluate(x => x.href)};
    }
    if (arr_begin_card.length === 0) {
      arr_begin_card[0] = {'card': 'card'}
    }
    if (arr_begin_card[0].card !== arr_finish_card[0].card) {
      const searchTerm = arr_begin_card[0].card;
      console.log(arr_finish_card);
      const find_elem = arr_finish_card.find(product => product.card === searchTerm);
      let id;
      if (find_elem === undefined) {
        id = 4;
      } else {
        id = find_elem.id;
      }
  
    let message_id = 0;

    const interval_id = setInterval(() => {
        if (message_id < id) {
          axios.post(uri_api, {
            chat_id : chat_id,
            parse_mode : 'html',
            text: `${arr_finish_card[message_id].article_name}
                   ${arr_finish_card[message_id].img}
                   ${arr_finish_card[message_id].price}
                   ${arr_finish_card[message_id].card}`
          })
          message_id++;
        } else {
          clearInterval(interval_id);
        }
      }, 2 * 1000);
    }
    arr_begin_card = arr_finish_card;
    page.waitForNavigation();
    const button = await page.$('#btnApply');
    await button.click();
  }

  setInterval(() => {
     fetchProductList(page);
  }, 20 * 1000);
  
})();



