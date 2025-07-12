import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';

const baseURL = 'https://automationintesting.online/';

test.describe('Booking tests', () => {
  test('should book a room successfully', async ({ page }) => {
    const bookingPage = new BookingPage(page);

    await page.goto(baseURL);
    await bookingPage.bookRoom({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '01234567890'
    });

    await expect(page.locator("//h2[normalize-space(text())='Booking Confirmed']")).toBeVisible();
    await expect(page.locator("//p[@class='text-center pt-2']//strong[1]")).toHaveText('2025-09-12 - 2025-09-13');
  });
});