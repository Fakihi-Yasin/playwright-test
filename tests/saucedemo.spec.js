const { test, expect } = require('@playwright/test');

const users = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'locked_out_user', password: 'secret_sauce' },
    { username: 'problem_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce' },
];

for (const user of users) {
    test(`Login test for ${user.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/v1/');

        await page.fill('#user-name', user.username);
        await page.fill('#password', user.password);
        await page.click('#login-button');

        if (user.username === 'locked_out_user') {
            const errorMessage = await page.locator('[data-test="error"]').textContent();
            expect(errorMessage).toContain('Sorry, this user has been locked out.');
        } else {
            await expect(page).toHaveURL(/inventory\.html/);
        }
    });
}
