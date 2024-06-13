const { test, expect, describe, beforeEach } = require('@playwright/test');
const { loginWith, addBlog, threeBlogs } = require('./helpers');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset');
        await request.post('/api/users', {
            data: {
                username: 'root',
                name: 'superuser',
                password: 'root'
            }
        });

        await page.goto('/');
    });

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Log into Bloglist')).toBeVisible();
        await expect(page.getByText('login')).toBeVisible();
    });

    describe('Login', () => {
        test('With correct credentials', async ({ page }) => {
            await loginWith(page, 'root', 'root');
            await expect(page.getByText('superuser is logged in')).toBeVisible();
        });

        test('And log out', async ({ page }) => {
            await loginWith(page, 'root', 'root');
            await page.getByRole('button', { name: 'logout' }).click();

            await expect(page.getByText('you are successfully logged out')).toBeVisible();
            await expect(page.getByText('Log into Bloglist')).toBeVisible();
        });

        test('With wrong credentials', async ({ page }) => {
            await loginWith(page, 'root', 'wrongpassword');

            //const notification = await page.locator('.notification');
            //await expect(notification).toContainText('invalid username or password');

            await expect(page.getByText('invalid username or password')).toBeVisible();
        });
    });

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'root', 'root');
        });

        test('Can see blog form', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click();
            await expect(page.getByText('Create a new blog')).toBeVisible();
            await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible();
        });

        test('A new blog can be created', async ({ page }) => {
            await addBlog(page, 'First blog', 'Me', 'https://example.com');
            await expect(page.getByText('First blog - Me')).toBeVisible();
        });

        describe('With three blogs', () => {
            beforeEach(async ({ page }) => {
                for (const blog of threeBlogs) {
                    await addBlog(page, blog.title, blog.author, blog.url);
                }
            });

            test('Add a like to second blog', async ({ page }) => {
                const blog = await page.getByText(`${threeBlogs[1].title} - ${threeBlogs[1].author}`);
                await blog.getByRole('button', { name: 'view' }).click();
                await page.getByRole('button', { name: 'like' }).click();
                await expect(page.getByText('likes 1')).toBeVisible();
            });

            test.only('Add five likes to third blog', async ({ page }) => {
                const blog = await page.getByText(`${threeBlogs[2].title} - ${threeBlogs[2].author}`);
                await blog.getByRole('button', { name: 'view' }).click();
                for (let i = 0; i < 5; ++i) {
                    const openedBlog = await page.getByText(`likes ${i}`);
                    await openedBlog.getByRole('button', { name: 'like' }).click();
                }
                await expect(page.getByText('likes 5')).toBeVisible();
            });
        });
    });
});