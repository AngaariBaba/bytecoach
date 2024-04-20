const puppeteer = require('puppeteer');

async function getLatestWhatsAppMessage() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com', { waitUntil: 'networkidle0' });

  // Wait for the user to log in
  await page.waitForSelector('._2_1wd',{ timeout: 60000 });
  await page.waitForTimeout(5000); // Wait for WhatsApp to load

  // Extract the latest message
  const latestMessage = await page.evaluate(() => {
    const messageElements = document.querySelectorAll('span.selectable-text');
    return messageElements[messageElements.length - 1]?.innerText || 'No messages';
  });
  
  await browser.close();

  return latestMessage;
}

getLatestWhatsAppMessage().then(message => {
  console.log('Latest WhatsApp Message:', message);
}).catch(error => {
  console.error('Error:', error);
});
