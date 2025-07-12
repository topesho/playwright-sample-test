import { test, expect } from '@playwright/test';

const baseURL = 'https://automationintesting.online/';

test.describe('Contact form tests', () => {
  test('should submit contact form successfully with valid data', async ({ page }) => {
    await page.goto(baseURL);

    await page.fill('#name', 'Alice Tester');
    await page.fill('#email', 'alice@example.com');
    await page.fill('#phone', '01234567899');
    await page.fill('#subject', 'Test Subject');
    await page.fill('#description', 'This is a test message.');

    await page.click('button:has-text("Submit")');

    await expect(page.locator("(//h3[@class='h4 mb-4'])[2]")).toContainText('Thanks for getting in touch');
  });

  test('should show validation error when submitting empty form', async ({ page }) => {
    await page.goto(baseURL);
    await page.click('button:has-text("Submit")');

    const alertLocator = page.locator('//div[contains(@class, "alert-danger")]');
    await expect(alertLocator).toBeVisible();


    const alertText = await alertLocator.textContent();
    
    const text = alertText as string;

    const expectedMessages = [
      'Subject may not be blank',
      'Name may not be blank',
      'Message may not be blank',
      'Message must be between 20 and 2000 characters.',
      'Subject must be between 5 and 100 characters.',
      'Phone may not be blank',
      'Phone must be between 11 and 21 characters.',
      'Email may not be blank'
    ];

    for (const msg of expectedMessages) {
      expect(text).toContain(msg);
    }
});
});


