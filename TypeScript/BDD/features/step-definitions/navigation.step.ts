import { Given, Then, When } from '@cucumber/cucumber';
import { expect, Locator } from 'playwright/test';

Given('I am on the home page {string}', async function (url: string) {
  await this.page.goto(url);
});

Then('I should see the title {string}', async function (title: string) {
  const actualtitle = await this.page.title();
  console.log("Actual Title: " + actualtitle);
  expect(actualtitle).toContain(title);
});

When('I hover over the {string} menu', async function (text: string) {
  const techMenu = this.page.locator('#menu-item-13227 .menu-text', { hasText: text });
  await techMenu.hover();
});

When('I scroll down to the table', async function () {
  const table = this.page.locator('.table-bordered');
  await table.scrollIntoViewIfNeeded();
});

Then('I should see the options {string}, {string}', async function (text1: string, text2: string) {
  const option1 = this.page.locator('#menu-item-19411 .menu-text', { hasText: text1 });
  const option2 = this.page.locator('#menu-item-19411 .menu-text', { hasText: text2 });
  console.log("Option 1: " + await option1.textContent());
  console.log("Option 2: " + await option2.textContent());
  await expect(option1).toBeVisible();
  await expect(option2).toBeVisible();

  const submenu = this.page.locator('ul.astra-megamenu');
  const menuItems = submenu.locator('li.menu-item-19411').nth(0);
  const submenuItems = menuItems.locator('.menu-text');
  for (let i = 0; i < await submenuItems.count(); i++) {
    const itemText = await submenuItems.nth(i).textContent();
    console.log(`Submenu Item ${i + 1}: ${itemText}`);
  }
});

Then('I should see the table with headers {string}, {string}, {string}, {string}, {string}, {string}', async function (string, string2, string3, string4, string5, string6) {
  const headers = this.page.locator('.table-bordered .thead .th');
  const expectedHeaders = [string, string2, string3, string4, string5, string6];
  const headerCount = await headers.count();

  for (let index = 0; index < headerCount; index++) {
    const header = headers.nth(index);
    const headerText = await header.textContent();
    console.log(`Header ${index + 1}: ${headerText}`);
    expect(headerText).toContain(expectedHeaders[index]);
  }
});

Then('Validate the Rows of the table', async function () {
  const table = this.page.locator('.table-bordered');

// Get all rows
const rows = table.locator('tr');
const rowCount = await rows.count();

for (let i = 0; i < rowCount; i++) {
  const row = rows.nth(i);

  // Get columns inside each row
  const columns = row.locator('th, td');
  const colCount = await columns.count();

  for (let j = 0; j < colCount; j++) {
    const cell = columns.nth(j);
    const text = await cell.innerText();
    if (text.trim() =='Gentry') 
      {
        console.log(`Found Gentry at Row ${i}, Col ${j}`);
         }

    console.log(`Row ${i}, Col ${j}: ${text}`);
  }}
});

Then('Validate the Broken Links', async function () {
  const links = await this.page.locator("a[href*='java']").all();
  for (const link of await links) {
    const href = await link.getAttribute('href');
    if (href) {
      try {
        const response = await this.page.request.get(href);
        if (response.status() >= 400) {
          console.log(`Broken link: ${href} (Status: ${response.status()})`);
        } else {
          console.log(`Valid link: ${href} (Status: ${response.status()})`);
        }
      } catch (error) {
        console.log(`Error checking link: ${href} - ${error}`);
      }
    }
  } 
});

Then('Validate the upload file feature', async function () {
  
  const fileInput =  this.page.locator('#uploadFile');
  const filePath = '/Users/admin/TypeScript/BDD/sample.txt'; 
  await fileInput.setInputFiles(filePath);  
});


Then('Validate the download file feature', async function () {
  const downloadLink = this.page.locator('#downloadButton');
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    downloadLink.click(),
  ]);

  const path = await download.path();
  console.log(`Downloaded file path: ${path}`);
  
});