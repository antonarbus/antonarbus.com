import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'playwright',
  date: '2024.10.01',
  tags: ['testing', 'js'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'playwright',
  body: (
    <>
      <H>About</H>

      <ul>
        <li>
          <Lnk path="https://playwright.dev/">Playwright</Lnk> is the end-to-end testing library
        </li>
        <li>
          It loads your app into headless browser and interacts with it like it would do a human
        </li>
      </ul>

      <H>Commands</H>

      <Code block jsx>{`
        "playwright": "npx playwright install && npx playwright test",
        "playwright:ui": "npx playwright install && npx playwright test --ui",
        "playwright:debug": "npx playwright install && npx playwright test --debug",
        "playwright:codegen": "npx playwright install && npx playwright codegen https://localhost:3000 --ignore-https-errors",
        "playwright:update": "npm i -D @playwright/test@latest",
      `}</Code>

      <H>Parallel vs serial</H>

      <Code block jsx>{`
        test.describe.configure({ mode: 'parallel' }) // default
        // test.describe.configure({ mode: 'serial' })

        test('runs in parallel 1', async ({ page }) => { /* ... */ })
        test('runs in parallel 2', async ({ page }) => { /* ... */ })
      `}</Code>

      <H>Assertions</H>

      <Lnk path="https://playwright.dev/docs/test-assertions">
        https://playwright.dev/docs/test-assertions
      </Lnk>

      <Code block jsx>{`
        // Auto-retrying assertions
        await expect(locator).toBeAttached() // element is attached
        await expect(locator).toBeChecked() // checkbox is checked
        await expect(locator).toBeDisabled() // element is disabled
        await expect(locator).toBeEditable() // element is editable
        await expect(locator).toBeEmpty() // container is empty
        await expect(locator).toBeEnabled() // element is enabled
        await expect(locator).toBeFocused() // element is focused
        await expect(locator).toBeHidden() // element is not visible
        await expect(locator).toBeInViewport() // element intersects viewport
        await expect(locator).toBeVisible() // element is visible
        await expect(locator).toContainText() // element contains text
        await expect(locator).toHaveAccessibleDescription() // element has a matching accessible description
        await expect(locator).toHaveAccessibleName() // element has a matching accessible name
        await expect(locator).toHaveAttribute() // element has a DOM attribute
        await expect(locator).toHaveClass() // element has a class property
        await expect(locator).toHaveCount() // list has exact number of children
        await expect(locator).toHaveCSS() // element has CSS property
        await expect(locator).toHaveId() // element has an ID
        await expect(locator).toHaveJSProperty() // element has a JavaScript property
        await expect(locator).toHaveRole() // element has a specific ARIA role
        await expect(locator).toHaveScreenshot() // element has a screenshot
        await expect(locator).toHaveText() // element matches text
        await expect(locator).toHaveValue() // input has a value
        await expect(locator).toHaveValues() // select has options selected
        await expect(page).toHaveScreenshot() // page has a screenshot
        await expect(page).toHaveTitle() // page has a title
        await expect(page).toHaveURL() // page has a URL
        await expect(response).toBeOK() // response has an OK status

        // Non-retrying assertions
        expect(value).toBe() // value is the same
        expect(value).toBeCloseTo() // number is approximately equal
        expect(value).toBeDefined() // value is not undefined
        expect(value).toBeFalsy() // value is falsy, e.g. false, 0, null, etc.
        expect(value).toBeGreaterThan() // number is more than
        expect(value).toBeGreaterThanOrEqual() // number is more than or equal
        expect(value).toBeInstanceOf() // object is an instance of a class
        expect(value).toBeLessThan() // number is less than
        expect(value).toBeLessThanOrEqual() // number is less than or equal
        expect(value).toBeNaN() // value is NaN
        expect(value).toBeNull() // value is null
        expect(value).toBeTruthy() // value is truthy, i.e. not false, 0, null, etc.
        expect(value).toBeUndefined() // value is undefined
        expect(value).toContain() // string contains a substring
        expect(data.message).toContain('Expired Token') // example from work
        expect(value).toContain() // array or set contains an element
        expect(value).toContainEqual() // array or set contains a similar element
        expect(value).toEqual() // value is similar // deep equality and pattern matching
        expect(value).toHaveLength() // array or string has length
        expect(value).toHaveProperty() // object has a property
        expect(value).toMatch() // string matches a regular expression
        expect(value).toMatchObject() // object contains specified properties
        expect(value).toStrictEqual() // value is similar, including property types
        expect(value).toThrow() // function throws an error
        expect(value).any() // matches any instance of a class/primitive
        expect(value).anything() // matches anything
        expect(value).arrayContaining() // array contains specific elements
        expect(value).closeTo() // number is approximately equal
        expect(value).objectContaining() // object contains specific properties
        expect(value).stringContaining() // string contains a substring
        expect(value).stringMatching() // string matches a regular expression
      `}</Code>

      <Hs>Negating matchers</Hs>

      <Code block jsx>{`
        expect(value).not.toEqual(0);
        await expect(locator).not.toContainText('some text');
      `}</Code>

      <Hs>Custom expect message</Hs>

      <p>
        String <i>"should be logged in"</i> will be visible in test logs
      </p>

      <Code block jsx>{`
        await expect(page.getByText('Name'), 'should be logged in').toBeVisible()
      `}</Code>

      <Hs>Soft assertions</Hs>

      <Code block jsx>{`
        // Make a few checks that will not stop the test when failed...
        await expect.soft(page.getByTestId('status')).toHaveText('Success')

        // ... and continue the test to check more things.
        await page.getByRole('link', { name: 'next page' }).click()
      `}</Code>

      <H>Locators</H>

      <ul>
        <li>
          <Lnk path="https://playwright.dev/docs/locators">
            https://playwright.dev/docs/locators
          </Lnk>
        </li>
        <li>
          <Lnk path="https://playwright.dev/docs/other-locators">
            https://playwright.dev/docs/other-locators
          </Lnk>
        </li>
      </ul>

      <Code block jsx>{`
        // Recommended
        page.getByRole() // to locate by explicit and implicit accessibility attributes.
        page.getByText() // to locate by text content.
        page.getByLabel() // to locate a form control by associated label's text.
        page.getByPlaceholder() // to locate an input by placeholder.
        page.getByAltText() // to locate an element, usually image, by its text alternative.
        page.getByTitle() // to locate an element by its title attribute.
        page.getByTestId() // to locate an element based on its data-testid attribute (other attributes can be configured).

        // Not recommended
        await page.locator('#tsf > div:nth-child(2) > div.A8SBwf > input').click();

        // CSS locator (not recommended)
        // Playwright adds custom pseudo-classes like :visible, :has-text(), :has(), :is(), :nth-match() and more.
        await page.locator('css=button').click();
        await page.locator('css=button:visible').click();
        await page.locator('css=[data-test="login"]:enabled').click();
        await page.locator('button').click();
        await page.locator('button:visible').click();
        await page.locator(':has-text("Playwright")').click();
        await page.locator('article:has-text("Playwright")').click();
        await page.locator('#nav-bar :text("Home")').click();
        await page.locator('#nav-bar :text-is(("Home")').click() // matches exact text
        await page.locator('#nav-bar :text-matches("reg?ex", "i")').click() // matches reg exp
        await page.locator('article:has(div.promo)').textContent() // elements that contain other elements
        await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click();
        await page.locator('button:near(.promo-card)').click();
        await page.locator('button:near(div > button)').click();
        await page.locator('button:above(.promo-card)').click();
        await page.locator('button:below(.promo-card)').click();
        await page.locator('button:right-of(.promo-card)').click() // button to the right of card
        await page.locator('input:right-of(:text("Username"))').fill('value');
        await page.locator('button:left-of(.promo-card)').click();
        await page.locator('[type=radio]:left-of(:text("Label 3"))').first().click();
        await page.locator(':nth-match(:text("Buy"), 3)').click() // click 3rd "Buy" button
        await page.locator('button').locator('nth=0').click() // click 1st button
        await page.locator('button').locator('nth=-1').click() // click last button
        await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click() // matching one of the conditions
        await page.locator('id=username').fill('value') // Fill an input with the id "username"
        await page.locator('data-test-id=submit').click() // Click an element with data-test-id "submit"

        // Parent element locator
        const child = page.getByText('Hello');
        const parent = page.getByRole('listitem').filter({ has: child });

        // React locator, only work against unminified application builds
        await page.locator('_react=BookItem').click() // match by component
        await page.locator('_react=BookItem[author = "Steven King"]').click() // match by component and exact property value, case-sensitive
        await page.locator('_react=[author = "Steven King" i]').click() // match by property value only, case-insensitive
        await page.locator('_react=MyButton[enabled]').click() // match by component and truthy property value
        await page.locator('_react=MyButton[enabled = false]').click() // match by component and boolean value
        await page.locator('_react=[author *= "King"]').click() // match by property value substring
        await page.locator('_react=BookItem[author *= "king" i][year = 1990]').click() // match by component and multiple properties
        await page.locator('_react=[some.nested.value = 12]').click() // match by nested property value
        await page.locator('_react=BookItem[author ^= "Steven"]').click() // match by component and property value prefix
        await page.locator('_react=BookItem[author $= "Steven"]').click() // match by component and property value suffix
        await page.locator('_react=BookItem[key = '2']').click() // match by component and key
        await page.locator('_react=[author = /Steven(\\\\s+King)?/i]'2']').click() // match by property value regex:

        // Examples
        await page.getByLabel('User Name').fill('John');
        await page.getByLabel('Password').fill('secret-password');

        await page.getByRole('button', { name: 'Sign in' }).click();
        await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
        await page.getByRole('checkbox', { name: 'Subscribe' }).check();
        await page.getByRole('button', { name: /submit/i }).click();
        const locator = page.getByRole('button', { name: 'Sign in' });
        await locator.hover();
        await locator.click();

        await expect(page.getByText('Welcome, John!')).toBeVisible();
        await expect(page.getByText('Welcome, John', { exact: true })).toBeVisible();
        await expect(page.getByText(/welcome, [A-Za-z]+$/i)).toBeVisible();

        await page.getByAltText('playwright logo').click();

        await expect(page.getByTitle('Issues count')).toHaveText('25 issues');

        await page.getByTestId('directions').click();
      `}</Code>

      <Hs>Filtering locators</Hs>

      <ul>
        <li>
          Locators can be filtered by text with the <Code>locator.filter()</Code> method
        </li>
        <li>Search for a particular string somewhere inside the element</li>
      </ul>

      <Code block jsx>{`
        // has text
        await page
          .getByRole('listitem')
          .filter({ hasText: 'Product 2' })
          .getByRole('button', { name: 'Add to cart' })
          .click();
        
        // Use a regular expression
        await page
          .getByRole('listitem')
          .filter({ hasText: /Product 2/ })
          .getByRole('button', { name: 'Add to cart' })
          .click();
        
        // Not having text
        await expect(page.getByRole('listitem').filter({ hasNotText: 'Out of stock' })).toHaveCount(5);

        // Filter by another locator
        await page
          .getByRole('listitem')
          .filter({ has: page.getByRole('heading', { name: 'Product 2' }) })
          .getByRole('button', { name: 'Add to cart' })
          .click();

        await expect(page
          .getByRole('listitem')
          .filter({ has: page.getByRole('heading', { name: 'Product 2' }) }))
          .toHaveCount(1);

        await expect(page
          .getByRole('listitem')
          .filter({ hasNot: page.getByText('Product 2') }))
          .toHaveCount(1);

        // Matching inside a locator
        const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });
        await product.getByRole('button', { name: 'Add to cart' }).click();
        await expect(product).toHaveCount(1);

        // Matching inside a locator with locator()
        const saveButton = page.getByRole('button', { name: 'Save' });
        const dialog = page.getByTestId('settings-dialog');
        await dialog.locator(saveButton).click();

        // Matching two locators simultaneously
        const button = page.getByRole('button').and(page.getByTitle('Subscribe'));

        // Matching one of the two alternative locators
        const newEmail = page.getByRole('button', { name: 'New' });
        const dialog = page.getByText('Confirm security settings');
        await expect(newEmail.or(dialog).first()).toBeVisible();
        if (await dialog.isVisible())
          await page.getByRole('button', { name: 'Dismiss' }).click();
        await newEmail.click();

        // Matching only visible elements
        await page.locator('button').locator('visible=true').click();

        // Count items in a list
        await expect(page.getByRole('listitem')).toHaveCount(3);

        // Assert all text in a list
        await expect(page
          .getByRole('listitem'))
          .toHaveText(['apple', 'banana', 'orange']);

        // Get a specific item
        await page.getByText('orange').click();
        await page.getByTestId('orange').click();
        const banana = await page.getByRole('listitem').nth(1);
        await page
          .getByRole('listitem')
          .filter({ hasText: 'orange' })
          .click();

        // Chaining filters
        const rowLocator = page.getByRole('listitem');
        await rowLocator
          .filter({ hasText: 'Mary' })
          .filter({ has: page.getByRole('button', { name: 'Say goodbye' }) })
        
        // Do something with each element in the list
        for (const row of await page.getByRole('listitem').all())
          console.log(await row.textContent())

        const rows = page.getByRole('listitem');
        const count = await rows.count();
        for (let i = 0; i < count; ++i)
          console.log(await rows.nth(i).textContent());

        const rows = page.getByRole('listitem');
        const texts = await rows.evaluateAll(
            list => list.map(element => element.textContent));

        // If more than one element
        await page.getByRole('button').click() // throws an error
        await page.getByRole('button').count() // ok

        // Locate specific item when many
        locator.first()
        locator.last()
        locator.nth()
      `}</Code>

      <H>Actions</H>

      <Lnk path="https://playwright.dev/docs/actionability">
        https://playwright.dev/docs/actionability
      </Lnk>

      <Code block jsx>{`
        await locator.check()
        await locator.click()
        await locator.dblclick()
        await locator.setChecked()
        await locator.tap()
        await locator.uncheck()
        await locator.hover()
        await locator.dragTo()
        await locator.screenshot()
        await locator.fill()
        await locator.clear()
        await locator.selectOption()
        await locator.selectText()
        await locator.scrollIntoViewIfNeeded()
        await locator.blur()
        await locator.dispatchEvent()
        await locator.focus()
        await locator.press()
        await locator.pressSequentially()
        await locator.setInputFiles()
      `}</Code>

      <Hs>Actions example</Hs>

      <Lnk path="https://playwright.dev/docs/input">https://playwright.dev/docs/input</Lnk>

      <Code block jsx>{`
        // Text input example
        await page.getByRole('textbox').fill('Peter') // Text input
        await page.getByLabel('Birth date').fill('2020-02-02') // Date input
        await page.getByLabel('Appointment time').fill('13:15') // Time input
        await page.getByLabel('Local time').fill('2020-03-02T05:15') // Local datetime input

        // Checkboxes and radio buttons example
        await page.getByLabel('I agree to the terms above').check() // Check the checkbox
        expect(page.getByLabel('Subscribe to newsletter')).toBeChecked() // Assert the checked state
        await page.getByLabel('XL').check() // Select the radio button

        // Select options example
        await page.getByLabel('Choose a color').selectOption('blue') // Single selection matching the value or label
        await page.getByLabel('Choose a color').selectOption({ label: 'Blue' }) // Single selection matching the label
        await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']) // Multiple selected items

        // Mouse click example
        await page.getByRole('button').click() // Generic click
        await page.getByText('Item').dblclick() // Double click
        await page.getByText('Item').click({ button: 'right' }) // Right click
        await page.getByText('Item').click({ modifiers: ['Shift'] }) // Shift + click
        await page.getByText('Item').click({ modifiers: ['ControlOrMeta'] }) // Ctrl + click or Windows and Linux, Meta + click on macOS
        await page.getByText('Item').hover() // Hover over element
        await page.getByText('Item').click({ position: { x: 0, y: 0 } }) // Click the top left corner

        // Forcing the click example
        await page.getByRole('button').click({ force: true });

        // Programmatic click example
        await page.getByRole('button').dispatchEvent('click');

        // Type characters example
        await page.locator('#area').pressSequentially('Hello World!') // Press keys one by one

        // Keys and shortcuts example
        await page.getByText('Submit').press('Enter') // Hit Enter
        await page.getByRole('textbox').press('Control+ArrowRight') // Dispatch Control+Right
        await page.getByRole('textbox').press('$') // Press $ sign on keyboard
        /*
        Can use Shift, Control, Alt, Meta, 
        Backquote, Minus, Equal, Backslash, Backspace, Tab, Delete, Escape,
        ArrowDown, End, Enter, Home, Insert, PageDown, PageUp, ArrowRight,
        ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc.
        "a"..."Z"
        "Control+o", "Control+Shift+T"
        */

        // Upload files example
        await page.getByLabel('Upload file').setInputFiles(path.join(__dirname, 'myfile.pdf')) // Select one file
        await page.getByLabel('Upload files').setInputFiles([
          path.join(__dirname, 'file1.txt'),
          path.join(__dirname, 'file2.txt'),
        ]) // Select multiple files
        await page.getByLabel('Upload directory').setInputFiles(path.join(__dirname, 'mydir')) // Select a directory
        await page.getByLabel('Upload file').setInputFiles([]) // Remove all the selected files
        await page.getByLabel('Upload file').setInputFiles({
          name: 'file.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('this is test')
        }) // Upload buffer from memory

        // If you don't have input element in hand (it is created dynamically)
        // Start waiting for file chooser before clicking. Note no await.
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.getByLabel('Upload file').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(__dirname, 'myfile.pdf'));

        // Focus element example
        await page.getByLabel('Password').focus();

        // Drag and Drop example
        await page.locator('#item-to-be-dragged').dragTo(page.locator('#item-to-drop-at'));

        // Dragging manually example
        await page.locator('#item-to-be-dragged').hover();
        await page.mouse.down();
        await page.locator('#item-to-drop-at').hover();
        await page.mouse.up();

        // Scrolling (usually Playwright does it automatically)
        await page.getByText('Footer text').scrollIntoViewIfNeeded() // Scroll the footer into view, forcing an "infinite list" to load more content
        // Position the mouse and scroll with the mouse wheel
        await page.getByTestId('scrolling-container').hover();
        await page.mouse.wheel(0, 10);
        // Alternatively, programmatically scroll a specific element
        await page.getByTestId('scrolling-container').evaluate(e => e.scrollTop += 100);
      `}</Code>

      <H>API testing</H>

      <ul>
        <li>
          <code>APIRequestContext</code> can send all kinds of HTTP(S) requests over network
        </li>
        <Code block jsx>{`
        import { apiUrl } from '@back/consts/apiUrl'
        import { connectToDb } from '@back/db/connectToDb'
        import { UserModel } from '@back/db/models/userModel'
        import { baseUrlBack } from '@back/utils/env'
        import { test, expect } from '@playwright/test'
        import { userFilePath } from 'tests/setup/userFilePath'

        test.describe.configure({ mode: 'serial' })

        test.describe('#activateRouter', () => {
          test.beforeAll(async () => {
            await connectToDb()
          })

          test.afterAll(async ({ request }) => {
            // console.log('do after test, for ex clean db')
          })

          test.use({ baseURL: baseUrlBack })

          const email = 'anton.arbus@gmail.com'

          test('should not return successful status if key is missing', async ({
            request,
          }) => {
            const res = await request.post(apiUrl.activate, {
              data: {
                activationKey: 'bad activation key',
              },
            })

            expect(res.ok()).toBeFalsy()
            expect(await res.json()).toMatchObject({
              message: 'activation key not found',
            })
          })

          test('should return successful status if activation key is correct', async ({
            request,
          }) => {
            const userDocument = await UserModel.findOneAndUpdate(
              { email },
              {
                activationKey: 'good activation key',
                isActivated: false,
              },
              { upsert: true, new: true },
            ).lean()

            const res = await request.post(apiUrl.activate, {
              data: {
                activationKey: userDocument.activationKey,
              },
            })

            await request.storageState({ path: userFilePath.authenticated })

            expect(res.ok()).toBeTruthy()
            expect(await res.json()).toMatchObject({ message: 'activated' })
          })

          test('should return successful status if account had been already activated', async ({
            request,
          }) => {
            const userDocument = await UserModel.findOneAndUpdate(
              { email },
              { isActivated: true },
              { upsert: true, new: true },
            ).lean()
            const res = await request.post(apiUrl.activate, {
              data: {
                activationKey: userDocument.activationKey,
              },
            })

            expect(res.ok()).toBeTruthy()
            expect(await res.json()).toMatchObject({ message: 'already activated' })
          })
        })


      `}</Code>

        <li>
          <code>request</code> object is also available in <code></code>
        </li>
      </ul>

      <H>Authentication</H>

      <Lnk path="https://playwright.dev/docs/auth">https://playwright.dev/docs/auth</Lnk>

      <ul>
        <li>Mainly we want to make tests for authenticated user</li>
        <li>We may do authentication for all tests using a dependency</li>
        <li>Create a file where auth user tokens will be stored</li>

        <Code block jsx>{`
          mkdir -p playwright/.auth
          echo $'\\nplaywright/.auth' >> .gitignore
        `}</Code>

        <li>Create a dependency which will be run ones before all tests</li>

        <Code block jsx>{`
          // auth.setup.ts
          import { test as setup, request } from '@playwright/test'
          import fs from 'fs/promises'
          import path from 'path'

          setup('authenticate', async () => {
            const context = await request.newContext({
              ignoreHTTPSErrors: true, // This line ignores certificate errors
            })

            const response = await context.post('/api/login', {
              data: {
                email: 'email@gmail.com',
                password: 'pass',
              },
            })

            if (response.ok()) {
              const authDir = path.resolve('playwright', '.auth')
              const filePath = path.join(authDir, 'authenticated_user.json')
              await fs.mkdir(authDir, { recursive: true })
              await context.storageState({ path: filePath })
            } else {
              throw new Error(\`Failed to authenticate: \${response.status()}\`)
            }
          })
        `}</Code>

        <li>
          Run all <i>*.setup.ts</i> files as a dependency before all tests
        </li>

        <Code block jsx>{`
          // playwright.config.ts
          import { baseUrlFrontDev } from '@back/utils/env'
          import { defineConfig, devices } from '@playwright/test'

          // https://playwright.dev/docs/test-configuration

          export default defineConfig({
            testDir: './tests',
            fullyParallel: true,
            forbidOnly: Boolean(process.env.CI),
            retries: process.env.CI ? 2 : 0,
            workers: process.env.CI ? 1 : undefined,
            reporter: process.env.CI ? 'dot' : 'list',
            use: {
              baseURL: baseUrlFrontDev,
              trace: 'on-first-retry',
            },
            projects: [
              {
                name: 'setup',
                testMatch: /.*\\.setup\\.ts/u,
                use: {
                  launchOptions: {
                    args: ['--ignore-certificate-errors'],
                  },
                },
              },
              {
                name: 'chromium',
                use: {
                  ...devices['Desktop Chrome'],
                  launchOptions: {
                    args: ['--ignore-certificate-errors'],
                  },
                  storageState: 'playwright/.auth/authenticated_user.json',
                },
                dependencies: ['setup'],
              },
            ],

            /* Run your local dev server before starting the tests */
            webServer: {
              command: 'npm run start',
              url: 'https://localhost:3000',
              reuseExistingServer: !process.env.CI,
              ignoreHTTPSErrors: true,
            },
          })
        `}</Code>

        <li>
          After setup test is run it will populate following file with cookies which should include
          auth data
        </li>

        <Code block jsx>{`
          // playwright/.auth/authenticated_user.json
          {
            "cookies": [
              {
                "name": "refreshJwtToken",
                "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uLmFyYnVzQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNzI2NTE4NzM5LCJleHAiOjE3MjkxMTA3Mzl9.-ig09wjRB3Seo6oSP3LAfIn0qE6E7lhrHCgxGaar5g8",
                "domain": "localhost",
                "path": "/",
                "expires": 1730268519,
                "httpOnly": true,
                "secure": false,
                "sameSite": "Lax"
              }
            ],
            "origins": []
          }
        `}</Code>

        <li>To avoid authentication we may create a file with empty cookies</li>

        <Code block jsx>{`
          // playwright/.auth/guest_user.json

          {
            "cookies": [],
            "origins": []
          }
        `}</Code>

        <li>Reference it in tests like where you don't need a user to be authenticated</li>

        <Code block jsx>{`
          test.use({ storageState: 'playwright/.auth/guest_user.json' })
          // or
          test.use({ storageState: { cookies: [], origins: [] } });
        `}</Code>

        <Code block jsx>{`
          test.describe('nav icons for guest user', () => {
            test.use({ viewport: { width: 1600, height: 1200 } })
            test.use({ storageState: 'playwright/.auth/guest_user.json' })

            test('should show icons & text', async ({ page }) => {
              await expect(nav.locator('[data-testid="login icon"]')).toBeVisible()
              await expect(nav).toHaveText(/Log in/u, { timeout: 1000 })
              await expect(nav.locator('[data-testid="profile icon"]')).not.toBeVisible()
              await expect(nav).not.toHaveText(/Profile/u, { timeout: 1000 })
            })
          })
        `}</Code>

        <li>
          Same way you may reference different auth files in different tests instead of setting it
          in the config
        </li>
        <li>
          For different auth roles you just do multiple login setup functions which create different
          files
        </li>

        <Code block jsx>{`
          // basic-auth.setup.ts
          import { test as setup, request } from '@playwright/test'
          import fs from 'fs/promises'
          import path from 'path'

          setup('authenticate basic user', async () => {
            const context = await request.newContext({
              ignoreHTTPSErrors: true, // This line ignores certificate errors
            })

            const response = await context.post('/api/login', {
              data: {
                email: 'basic-user@gmail.com',
                password: 'some password',
              },
            })

            if (response.ok()) {
              const authDir = path.resolve('playwright', '.auth')
              const filePath = path.join(authDir, 'basic_user.json')
              await fs.mkdir(authDir, { recursive: true })
              await context.storageState({ path: filePath })
            } else {
              throw new Error(\`Failed to authenticate: \${response.status()}\`)
            }
          })

          // admin-auth.setup.ts
          import { test as setup, request } from '@playwright/test'
          import fs from 'fs/promises'
          import path from 'path'

          setup('authenticate admin user', async () => {
            const context = await request.newContext({
              ignoreHTTPSErrors: true, // This line ignores certificate errors
            })

            const response = await context.post('/api/login', {
              data: {
                email: 'admin-user@gmail.com',
                password: 'some password',
              },
            })

            if (response.ok()) {
              const authDir = path.resolve('playwright', '.auth')
              const filePath = path.join(authDir, 'admin_user.json')
              await fs.mkdir(authDir, { recursive: true })
              await context.storageState({ path: filePath })
            } else {
              throw new Error(\`Failed to authenticate: \${response.status()}\`)
            }
          })
        `}</Code>

        <li>
          And you just point to those files in <code>storageState</code> in tests or test groups,
          instead of setting it globally in the config.
        </li>

        <Code block jsx>{`
          import { test } from '@playwright/test';

          test.use({ storageState: 'playwright/.auth/basic_user.json' });

          test('basic user test', async ({ page }) => {
            // page is authenticated as basic user
          });

          test.describe(() => {
            test.use({ storageState: 'playwright/.auth/admin_user.json' });

            test('admin user test', async ({ page }) => {
              // page is authenticated as a admin_ user
            });
          })
        `}</Code>

        <li>
          To test how users with different roles interact together in a single test have to create
          pages with different contexts
        </li>

        <Code block jsx>{`
          import { test } from '@playwright/test';

          test('admin and user', async ({ browser }) => {
            // adminContext and all pages inside, including adminPage, are signed in as "admin".
            const adminContext = await browser.newContext({ storageState: 'playwright/.auth/admin.json' });
            const adminPage = await adminContext.newPage();

            // userContext and all pages inside, including userPage, are signed in as "user".
            const userContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
            const userPage = await userContext.newPage();

            // ... interact with both adminPage and userPage ...

            await adminContext.close();
            await userContext.close();
          });
        `}</Code>

        <li>
          If some api test invalidates auth tokens you need to update the files to prevent other
          tests to fail
        </li>

        <Code block jsx>{`
          test('should return successful status if activation key is correct', async ({
            request,
          }) => {
            const userDocument = await UserModel.findOneAndUpdate(
              { email },
              {
                activationKey: 'good activation key',
                isActivated: false,
              },
              { upsert: true, new: true },
            ).lean()

            const res = await request.post(apiUrl.activate, {
              data: {
                activationKey: userDocument.activationKey,
              },
            })

            const filePath = path.resolve( 'playwright', '.auth', 'authenticated_user.json', )

            await request.storageState({ path: filePath })

            expect(res.ok()).toBeTruthy()
            expect(await res.json()).toMatchObject({
              message: 'activated',
            })
          })
        `}</Code>
      </ul>

      <H>Session storage</H>

      <ul>
        <li>Some data from session storage may be required for tests, for example </li>
        <li>Session storage is specific to a particular domain</li>
        <li>It is not persisted across page loads</li>
        <li>Playwright does not provide API to persist session storage</li>
        <li>Here is the hack to emulate the session storage</li>
      </ul>

      <Code block jsx>{`
        // Get session storage and store as env variable
        const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
        fs.writeFileSync('playwright/.auth/session.json', sessionStorage, 'utf-8');

        // Set session storage in a new context
        const sessionStorage = JSON.parse(fs.readFileSync('playwright/.auth/session.json', 'utf-8'));
        await context.addInitScript(storage => {
          if (window.location.hostname === 'example.com') {
            for (const [key, value] of Object.entries(storage))
              window.sessionStorage.setItem(key, value);
          }
        }, sessionStorage);
      `}</Code>

      <H>Clock</H>

      <p>
        <Lnk path="https://playwright.dev/docs/api/class-clock">Clock api</Lnk> provides the
        following methods to control time:
      </p>

      <Code block jsx>{`
        setFixedTime() // Sets the fixed time for Date.now() and new Date()
        install() // initializes the clock and allows you to
        pauseAt() // Pauses the time at a specific time
        fastForward() // Fast forwards the time
        runFor() // Runs the time for a specific duration
        resume() // Resumes the time
        setSystemTime() // Sets the current system time
      `}</Code>

      <Code block html>{`
        <div id="current-time" data-testid="current-time"></div>
        <script>
          const renderTime = () => {
            document.getElementById('current-time').textContent =
                new Date().toLocaleString();
          };
          setInterval(renderTime, 1000);
        </script>
      `}</Code>

      <Code block jsx>{`
        // test 1 - setFixedTime
        await page.clock.setFixedTime(new Date('2024-02-02T10:00:00'));
        await page.goto('http://localhost:3333');
        await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:00:00 AM');

        await page.clock.setFixedTime(new Date('2024-02-02T10:30:00'));
        // We know that the page has a timer that updates the time every second.
        await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:30:00 AM');

        // test 2 - install + pauseAt + fastForward
        // Initialize clock with some time before the test time and let the page load
        // naturally. \`Date.now\` will progress as the timers fire.
        await page.clock.install({ time: new Date('2024-02-02T08:00:00') });
        await page.goto('http://localhost:3333');

        // Pretend that the user closed the laptop lid and opened it again at 10am,
        // Pause the time once reached that point.
        await page.clock.pauseAt(new Date('2024-02-02T10:00:00'));

        // Assert the page state.
        await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:00:00 AM');

        // Close the laptop lid again and open it at 10:30am.
        await page.clock.fastForward('30:00');
        await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:30:00 AM');

        // test 3 - runFor
        // Initialize clock with a specific time, let the page load naturally.
        await page.clock.install({ time: new Date('2024-02-02T08:00:00') });
        await page.goto('http://localhost:3333');

        // Pause the time flow, stop the timers, you now have manual control
        // over the page time.
        await page.clock.pauseAt(new Date('2024-02-02T10:00:00'));
        await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:00:00 AM');

        // Tick through time manually, firing all timers in the process.
        // In this case, time will be updated in the screen 2 times.
        await page.clock.runFor(2000);
        await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:00:02 AM');
      `}</Code>

      <H>Dialogs</H>

      <ul>
        <li>alert(), confirm(), prompt() are dismissed by default in playwright</li>
        <li>to handle the dialog you need to register the listener</li>
      </ul>

      <Code block jsx>{`
        // alert(), confirm(), prompt()
        page.on('dialog', dialog => dialog.accept()) // or dialog.dismiss()
        await page.getByRole('button').click()

        // beforeunload
        page.on('dialog', async dialog => {
          assert(dialog.type() === 'beforeunload')
          await dialog.dismiss()
        })
        await page.close({ runBeforeUnload: true })

        // printer dialog
        await page.goto('<url>')
        await page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f)})()')
        await page.getByText('Print it!').click()
        await page.waitForFunction('window.waitForPrintDialog')
      `}</Code>

      <H>Downloads</H>

      <ul>
        <li>
          For every download by the page, <code>page.on('download')</code> event is emitted
        </li>
        <li>attachments are downloaded into a temporary folder</li>
        <li>You can obtain the download url, file name and payload stream</li>
        <li>Downloaded files are deleted when the browser context that produced them is closed</li>

        <Code block jsx>{`
          // Start waiting for download before clicking. Note no await.
          const downloadPromise = page.waitForEvent('download')
          await page.getByText('Download file').click()
          const download = await downloadPromise

          // Wait for the download process to complete and save the downloaded file somewhere.
          await download.saveAs('/path/to/save/at/' + download.suggestedFilename())
        `}</Code>

        <li>If you have no idea what initiates the download, you can still handle the event</li>

        <Code block jsx>{`
          page.on('download', download => download.path().then(console.log))
        `}</Code>
      </ul>

      <H>Run JS in page</H>

      <ul>
        <li>
          <code>page.evaluate()</code> allows you to execute JavaScript in the context of the web
          page
        </li>
        <li>test and page has different contexts</li>
        <li>but you can run JS in page and bring result back to test</li>

        <Code block jsx>{`
          // not promise
          const href = await page.evaluate(() => document.location.href);
          console.log(await page.evaluate('1 + 2')); // prints "3"
          const x = 10;
          console.log(await page.evaluate(\`1 + \${x}\`)); // prints "11"

          // promise
          const status = await page.evaluate(async () => {
            const response = await fetch(location.href);
            return response.status;
          });
        `}</Code>

        <li>if you need to pass a variable to the page as a parameter </li>

        <Code block jsx>{`
          const data = 'some data';
          const result = await page.evaluate(data => {
            window.myApp.use(data);
          }, data);
        `}</Code>

        <li>
          <Lnk path="https://playwright.dev/docs/evaluating">
            https://playwright.dev/docs/evaluating
          </Lnk>{' '}
          check it further, not very clear....
        </li>
      </ul>

      <H>Events</H>

      <ul>
        <li>
          <Lnk path="https://playwright.dev/docs/events">https://playwright.dev/docs/events</Lnk>{' '}
          check it further, not very clear....
        </li>
      </ul>

      <H>iFrame</H>

      <ul>
        <li>a page can have iframe</li>

        <Code block jsx>{`
          // Locate element inside frame
          const username = await page.frameLocator('.frame-class').getByLabel('User Name');
          await username.fill('John')

          // Get frame using the frame's name attribute
          const frame = page.frame('frame-login');

          // Get frame using frame's URL
          const frame = page.frame({ url: /.*domain.*/ });

          // Interact with the frame
          await frame.fill('#username-input', 'John');
        `}</Code>
      </ul>

      <H>Mock request</H>

      <ul>
        <li>Any requests that a page does can be tracked, modified and mocked</li>
        <li>
          The following code will intercept all the calls to */**/api/v1/fruits and will return a
          custom response instead.
        </li>
        <li>No requests to the API will be made</li>

        <Code block jsx>{`
          test("mocks a fruit and doesn't call api", async ({ page }) => {
            // Mock the api call before navigating
            await page.route('*/**/api/v1/fruits', async route => {
              const json = [{ name: 'Strawberry', id: 21 }]
              await route.fulfill({ json })
            })

            // Go to the page
            await page.goto('https://demo.playwright.dev/api-mocking')

            // Assert that the Strawberry fruit is visible
            await expect(page.getByText('Strawberry')).toBeVisible()
          })
        `}</Code>

        <li>Shorter version</li>

        <Code block jsx>{`
          await page.route('**/api/fetch_data', route => route.fulfill({
            status: 200,
            body: testData,
          }));
          await page.goto('https://example.com');
        `}</Code>
      </ul>

      <H>Modify response</H>

      <Code block jsx>{`
        test('gets the json from api and adds a new fruit', async ({ page }) => {
          // Get the response and add to it
          await page.route('*/**/api/v1/fruits', async route => {
            const response = await route.fetch()
            const json = await response.json()
            json.push({ name: 'Loquat', id: 100 })

            // Fulfill using the original response, while patching the response body
            // with the given JSON object.
            await route.fulfill({ response, json })
          })

          // Go to the page
          await page.goto('https://demo.playwright.dev/api-mocking')

          // Assert that the new fruit is visible
          await expect(page.getByText('Loquat', { exact: true })).toBeVisible()
        })
      `}</Code>

      <p>You can override individual fields on the response</p>

      <Code block jsx>{`
        await page.route('**/title.html', async route => {
          // Fetch original response.
          const response = await route.fetch();
          // Add a prefix to the title.
          let body = await response.text();
          body = body.replace('<title>', '<title>My prefix:');
          await route.fulfill({
            // Pass all fields from the response.
            response,
            // Override response body.
            body,
            // Force content type to be html.
            headers: {
              ...response.headers(),
              'content-type': 'text/html'
            }
          });
        });
      `}</Code>

      <H>Modify request</H>

      <Code block jsx>{`
        // Delete header
        await page.route('**/*', async route => {
          const headers = route.request().headers();
          delete headers['X-Secret'];
          await route.continue({ headers });
        });

        // Continue requests as POST.
        await page.route('**/*', route => route.continue({ method: 'POST' }));
      `}</Code>

      <H>Abort request</H>

      <Code block jsx>{`
        test.beforeEach(async ({ context }) => {
          // Block any css requests for each test in this file.
          await context.route(/.css$/, route => route.abort())
        })

        test('loads page without css', async ({ page }) => {
          await page.goto('https://playwright.dev')
          // ... test goes here
        })
      `}</Code>

      <p>
        Or, you can use <Code>page.route()</Code>
      </p>

      <Code block jsx>{`
        test('loads page without images', async ({ page }) => {
          // Block png and jpeg images
          await page.route(/(png|jpeg)$/, route => route.abort())

          await page.goto('https://playwright.dev')
          // ... test goes here
        })
      `}</Code>

      <Code block jsx>{`
        // Abort based on the request type
        await page.route('**/*', route => {
          return route.request().resourceType() === 'image' ? route.abort() : route.continue();
        });
      `}</Code>

      <H>HTTP Authentication</H>

      <ul>
        <li>
          Via <Code>playwright.config.ts</Code>
        </li>

        <Code block jsx>{`
          import { defineConfig } from '@playwright/test';
          export default defineConfig({
            use: {
              httpCredentials: {
                username: 'bill',
                password: 'pa55w0rd',
              }
            }
          });
        `}</Code>

        <li>In test</li>

        <Code block jsx>{`
          const context = await browser.newContext({
            httpCredentials: {
              username: 'bill',
              password: 'pa55w0rd',
            },
          });
          const page = await context.newPage();
          await page.goto('https://example.com');
        `}</Code>
      </ul>

      <H>HTTP Proxy</H>

      <ul>
        <li>
          Proxy can be either set globally for the entire browser, or for each browser context
          individually
        </li>

        <Code block jsx>{`
          // playwright.config.ts
          import { defineConfig } from '@playwright/test';
          export default defineConfig({
            use: {
              proxy: {
                server: 'http://myproxy.com:3128',
                username: 'usr',
                password: 'pwd'
              }
            }
          });
        `}</Code>

        <li>Or in test</li>

        <Code block jsx>{`
          import { test, expect } from '@playwright/test';

          test('should use custom proxy on a new context', async ({ browser }) => {
            const context = await browser.newContext({
              proxy: {
                server: 'http://myproxy.com:3128',
              }
            });
            const page = await context.newPage();

            await context.close();
          });
        `}</Code>
      </ul>

      <H>WebSockets</H>

      <ul>
        <li>Playwright supports WebSockets inspection out of the box</li>

        <Code block jsx>{`
          page.on('websocket', ws => {
            console.log(\`WebSocket opened: \${ws.url()}>\`);
            ws.on('framesent', event => console.log(event.payload));
            ws.on('framereceived', event => console.log(event.payload));
            ws.on('close', () => console.log('WebSocket closed'));
          });
        `}</Code>
      </ul>

      <H>Network events</H>

      <ul>
        <li>You can monitor all the Requests and Responses</li>

        <Code block jsx>{`
          // Subscribe to 'request' and 'response' events.
          page.on('request', request => console.log('>>', request.method(), request.url()));
          page.on('response', response => console.log('<<', response.status(), response.url()));

          await page.goto('https://example.com');
        `}</Code>

        <li>
          Or wait for a network response after the button click with{' '}
          <Code>page.waitForResponse()</Code>
        </li>

        <Code block jsx>{`
          // Use a glob URL pattern. Note no await.
          const responsePromise = page.waitForResponse('**/api/fetch_data');
          await page.getByText('Update').click();
          const response = await responsePromise;

          // or use a RegExp. Note no await.
          const responsePromise = page.waitForResponse(/\\.jpeg$/);
          await page.getByText('Update').click();
          const response = await responsePromise;

          // Use a predicate taking a Response object. Note no await.
          const responsePromise = page.waitForResponse(response => response.url().includes(token));
          await page.getByText('Update').click();
          const response = await responsePromise;
        `}</Code>
      </ul>

      <H>Page loading</H>

      <ul>
        <li>Playwright can load page and wait for the target elements to become actionable</li>
        <li>
          If clicking an element could trigger multiple navigations then use{' '}
          <Code>waitForURL()</Code>
        </li>

        <Code block jsx>{`
          // goto()
          await page.goto('https://example.com')
          await page.getByText('Example Domain').click()

          // waitForURL()
          await page.getByText('Click me').click()
          await page.waitForURL('**/login')
        `}</Code>
      </ul>

      <H>Page model</H>

      <ul>
        <li>Page objects may simplify authoring by creating a higher-level API for your page</li>
        <li>
          PlaywrightDevPage helper class to encapsulate common operations on the playwright.dev
          page.
        </li>

        <Code block jsx>{`
          // playwright-dev-page.ts
          import { expect, type Locator, type Page } from '@playwright/test';

          export class PlaywrightDevPage {
            readonly page: Page;
            readonly getStartedLink: Locator;
            readonly gettingStartedHeader: Locator;
            readonly pomLink: Locator;
            readonly tocList: Locator;

            constructor(page: Page) {
              this.page = page;
              this.getStartedLink = page.locator('a', { hasText: 'Get started' });
              this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
              this.pomLink = page.locator('li', {
                hasText: 'Guides',
              }).locator('a', {
                hasText: 'Page Object Model',
              });
              this.tocList = page.locator('article div.markdown ul > li > a');
            }

            async goto() {
              await this.page.goto('https://playwright.dev');
            }

            async getStarted() {
              await this.getStartedLink.first().click();
              await expect(this.gettingStartedHeader).toBeVisible();
            }

            async pageObjectModel() {
              await this.getStarted();
              await this.pomLink.click();
            }
          }
        `}</Code>

        <li>use the custom page in your tests</li>

        <Code block jsx>{`
          import { test, expect } from '@playwright/test';
          import { PlaywrightDevPage } from './playwright-dev-page';

          test('getting started should contain table of contents', async ({ page }) => {
            const playwrightDev = new PlaywrightDevPage(page);
            await playwrightDev.goto();
            await playwrightDev.getStarted();
            await expect(playwrightDev.tocList).toHaveText([
              \`How to install Playwright\`,
              \`What's Installed\`,
              \`How to run the example test\`,
              \`How to open the HTML test report\`,
              \`Write tests using web first assertions, page fixtures and locators\`,
              \`Run single test, multiple tests, headed mode\`,
              \`Generate tests with Codegen\`,
              \`See a trace of your tests\`
            ]);
          });

          test('should show Page Object Model article', async ({ page }) => {
            const playwrightDev = new PlaywrightDevPage(page);
            await playwrightDev.goto();
            await playwrightDev.pageObjectModel();
            await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
          });
        `}</Code>
      </ul>

      <H>Multiple browser contexts</H>

      <Code block jsx>{`
        test('admin and user', async ({ browser }) => {
          // Create two isolated browser contexts
          const adminContext = await browser.newContext()
          const userContext = await browser.newContext()

          // Create pages and interact with contexts independently
          const adminPage = await adminContext.newPage()
          const userPage = await userContext.newPage()
        })
      `}</Code>

      <H>Multiple pages</H>

      <ul>
        <li>Each BrowserContext can have multiple pages</li>
        <li>A Page refers to a single tab or a popup window within a browser context</li>
        <li>It should be used to navigate to URLs and interact with the page content.</li>

        <Code block jsx>{`
          // Create a page.
          const page = await context.newPage();

          // Navigate explicitly, similar to entering a URL in the browser.
          await page.goto('http://example.com');
          // Fill an input.
          await page.locator('#search').fill('query');

          // Navigate implicitly by clicking a link.
          await page.locator('#submit').click();
          // Expect a new url.
          console.log(page.url());
        `}</Code>

        <li>Each browser context can host multiple pages (tabs)</li>

        <Code block jsx>{`
          // Create two pages
          const pageOne = await context.newPage();
          const pageTwo = await context.newPage();

          // Get pages of a browser context
          const allPages = context.pages();
        `}</Code>

        <li>
          Link opened in a new page{' '}
          <Code inline html>
            {'target="_blank"'}
          </Code>
        </li>

        <Code block jsx>{`
          // Start waiting for new page before clicking. Note no await.
          const pagePromise = context.waitForEvent('page');
          await page.getByText('open new tab').click();
          const newPage = await pagePromise;
          // Interact with the new page normally.
          await newPage.getByRole('button').click();
          console.log(await newPage.title());
        `}</Code>

        <li>
          If the action that triggers the new page is unknown, the following pattern can be used.
        </li>

        <Code block jsx>{`
          // Get all new pages (including popups) in the context
          context.on('page', async page => {
            await page.waitForLoadState();
            console.log(await page.title());
          });
        `}</Code>

        <li>If the page opens a pop-up</li>

        <Code block jsx>{`
          // Start waiting for popup before clicking. Note no await.
          const popupPromise = page.waitForEvent('popup');
          await page.getByText('open the popup').click();
          const popup = await popupPromise;
          // Interact with the new popup normally.
          await popup.getByRole('button').click();
          console.log(await popup.title());
        `}</Code>

        <li>
          If the action that triggers the popup is unknown, the following pattern can be used.
        </li>

        <Code block jsx>{`
          // Get all popups when they open
          page.on('popup', async popup => {
            await popup.waitForLoadState();
            console.log(await popup.title());
          });
        `}</Code>
      </ul>

      <H>Cookie modification</H>

      <Code block jsx>{`
        test.describe('user/me', () => {
        test.use({ baseURL: process.env.BACKEND_BASE_URL })

        test('should throw 403 status if ltpa token is invalid', async ({ request, page }) => {
          await page.context().clearCookies()
          await page.context().addCookies([
            {
              name: 'LtpaToken',
              value: 'invalid token',
              domain: '/webapp.com',
              path: '/',
              httpOnly: true,
              secure: true,
              expires: -1
            }
          ])
          const res = await page.request.get('user/')
          expect(res.status()).toBe(403)
          const data = await res.json()
          expect(data.message).toContain('Expired LTPA Token')
        })
      `}</Code>
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
