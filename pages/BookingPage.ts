import { Page } from '@playwright/test';

interface BookingData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export class BookingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async bookRoom(data: BookingData) {
    await this.page.locator("(//a[contains(@class,'btn btn-primary')])[1]").click();
    await this.page.locator("(//input[@class='form-control'])[1]").fill("12/09/2025");
    await this.page.locator("(//input[@class='form-control'])[2]").click()
    await this.page.locator("(//input[@class='form-control'])[2]").fill("13/09/2025");
    await this.page.locator("(//input[@class='form-control'])[2]").press('Enter');
    await this.page.locator("//button[normalize-space(text())='Check Availability']").click();
    await this.page.locator("(//a[@class='btn btn-primary'])[1]").click();
    await this.page.locator("//button[normalize-space(text())='Next']").click();
    await this.page.locator("//button[normalize-space(text())='Next']").click();
    await this.page.locator("//div[@title='Selected']").click();
    await this.page.locator("//button[normalize-space(text())='Reserve Now']").click();
  
    await this.page.locator('//input[@class="form-control room-firstname"]').fill(data.firstname);
    await this.page.locator("//input[@class='form-control room-lastname']").fill(data.lastname);
    await this.page.locator("//input[@class='form-control room-email']").fill(data.email);
    await this.page.locator("//input[@class='form-control room-phone']").fill(data.phone);
    await this.page.locator("//button[normalize-space(text())='Reserve Now']").click();
  }
}