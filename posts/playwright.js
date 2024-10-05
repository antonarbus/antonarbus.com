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

      <H>Assertions</H>

      <Lnk path="https://playwright.dev/docs/test-assertions">
        https://playwright.dev/docs/test-assertions
      </Lnk>

      <Code block jsx>{`
        // Auto-retrying assertions
        await expect(locator).toBeAttached() - element is attached
        await expect(locator).toBeChecked() - checkbox is checked
        await expect(locator).toBeDisabled() - element is disabled
        await expect(locator).toBeEditable() - element is editable
        await expect(locator).toBeEmpty() - container is empty
        await expect(locator).toBeEnabled() - element is enabled
        await expect(locator).toBeFocused() - element is focused
        await expect(locator).toBeHidden() - element is not visible
        await expect(locator).toBeInViewport() - element intersects viewport
        await expect(locator).toBeVisible() - element is visible
        await expect(locator).toContainText() - element contains text
        await expect(locator).toHaveAccessibleDescription() - element has a matching accessible description
        await expect(locator).toHaveAccessibleName() - element has a matching accessible name
        await expect(locator).toHaveAttribute() - element has a DOM attribute
        await expect(locator).toHaveClass() - element has a class property
        await expect(locator).toHaveCount() - list has exact number of children
        await expect(locator).toHaveCSS() - element has CSS property
        await expect(locator).toHaveId() - element has an ID
        await expect(locator).toHaveJSProperty() - element has a JavaScript property
        await expect(locator).toHaveRole() - element has a specific ARIA role
        await expect(locator).toHaveScreenshot() - element has a screenshot
        await expect(locator).toHaveText() - element matches text
        await expect(locator).toHaveValue() - input has a value
        await expect(locator).toHaveValues() - select has options selected
        await expect(page).toHaveScreenshot() - page has a screenshot
        await expect(page).toHaveTitle() - page has a title
        await expect(page).toHaveURL() - page has a URL
        await expect(response).toBeOK() - response has an OK status

        // Non-retrying assertions
        expect(value).toBe() - value is the same
        expect(value).toBeCloseTo() - number is approximately equal
        expect(value).toBeDefined() - value is not undefined
        expect(value).toBeFalsy() - value is falsy, e.g. false, 0, null, etc.
        expect(value).toBeGreaterThan() - number is more than
        expect(value).toBeGreaterThanOrEqual() - number is more than or equal
        expect(value).toBeInstanceOf() - object is an instance of a class
        expect(value).toBeLessThan() - number is less than
        expect(value).toBeLessThanOrEqual() - number is less than or equal
        expect(value).toBeNaN() - value is NaN
        expect(value).toBeNull() - value is null
        expect(value).toBeTruthy() - value is truthy, i.e. not false, 0, null, etc.
        expect(value).toBeUndefined() - value is undefined
        expect(value).toContain() - string contains a substring
        expect(value).toContain() - array or set contains an element
        expect(value).toContainEqual() - array or set contains a similar element
        expect(value).toEqual() - value is similar - deep equality and pattern matching
        expect(value).toHaveLength() - array or string has length
        expect(value).toHaveProperty() - object has a property
        expect(value).toMatch() - string matches a regular expression
        expect(value).toMatchObject() - object contains specified properties
        expect(value).toStrictEqual() - value is similar, including property types
        expect(value).toThrow() - function throws an error
        expect(value).any() - matches any instance of a class/primitive
        expect(value).anything() - matches anything
        expect(value).arrayContaining() - array contains specific elements
        expect(value).closeTo() - number is approximately equal
        expect(value).objectContaining() - object contains specific properties
        expect(value).stringContaining() - string contains a substring
        expect(value).stringMatching() - string matches a regular expression
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
        page.getByRole() to locate by explicit and implicit accessibility attributes.
        page.getByText() to locate by text content.
        page.getByLabel() to locate a form control by associated label's text.
        page.getByPlaceholder() to locate an input by placeholder.
        page.getByAltText() to locate an element, usually image, by its text alternative.
        page.getByTitle() to locate an element by its title attribute.
        page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

        // Not recommended
        await page.locator('#tsf > div:nth-child(2) > div.A8SBwf > input').click();

        // CSS locator (not recommended)
        // Playwright adds custom pseudo-classes like :visible, :has-text(), :has(), :is(), :nth-match() and more.
        await page.locator('css=button').click();
        await page.locator('button').click();
        await page.locator('button:visible').click();
        await page.locator(':has-text("Playwright")').click();
        await page.locator('article:has-text("Playwright")').click();
        await page.locator('#nav-bar :text("Home")').click();
        await page.locator('article:has(div.promo)').textContent();
        await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click();
        await page.locator('button:near(.promo-card)').click();
        await page.locator('button:above(.promo-card)').click();
        await page.locator('button:below(.promo-card)').click();
        await page.locator('button:right-of(.promo-card)').click();
        await page.locator('input:right-of(:text("Username"))').fill('value');
        await page.locator('button:left-of(.promo-card)').click();
        await page.locator('[type=radio]:left-of(:text("Label 3"))').first().click();
        await page.locator(':nth-match(:text("Buy"), 3)').click(); // click 3rd "Buy" button
        await page.locator('button').locator('nth=0').click(); // click 1st button
        await page.locator('button').locator('nth=-1').click(); // click last button

        // Parent element locator
        const child = page.getByText('Hello');
        const parent = page.getByRole('listitem').filter({ has: child });

        // React locator
        // Only work against unminified application builds
        await page.locator('_react=BookItem').click(); // match by component
        await page.locator('_react=BookItem[author = "Steven King"]').click(); // match by component and exact property value, case-sensitive
        await page.locator('_react=[author = "Steven King" i]').click(); // match by property value only, case-insensitive
        await page.locator('_react=MyButton[enabled]').click(); // match by component and truthy property value
        await page.locator('_react=MyButton[enabled = false]').click(); // match by component and boolean value
        await page.locator('_react=[author *= "King"]').click(); // match by property value substring
        await page.locator('_react=BookItem[author *= "king" i][year = 1990]').click(); // match by component and multiple properties
        await page.locator('_react=[some.nested.value = 12]').click(); // match by nested property value
        await page.locator('_react=BookItem[author ^= "Steven"]').click(); // match by component and property value prefix
        await page.locator('_react=BookItem[author $= "Steven"]').click(); // match by component and property value suffix
        await page.locator('_react=BookItem[key = '2']').click(); // match by component and key
        await page.locator('_react=[author = /Steven(\\\\s+King)?/i]'2']').click(); // match by property value regex:

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
        await page.getByRole('button').click(); // throws an error
        await page.getByRole('button').count(); // ok

        // Locate specific item when many
        locator.first()
        locator.last()
        locator.nth()
      `}</Code>

      <H>Actions</H>

      <Lnk path="https://playwright.dev/docs/input">https://playwright.dev/docs/input</Lnk>

      <Code block jsx>{`
        // Text input
        await page.getByRole('textbox').fill('Peter'); // Text input
        await page.getByLabel('Birth date').fill('2020-02-02') // Date input
        await page.getByLabel('Appointment time').fill('13:15'); // Time input
        await page.getByLabel('Local time').fill('2020-03-02T05:15'); // Local datetime input

        // Checkboxes and radio buttons
        await page.getByLabel('I agree to the terms above').check(); // Check the checkbox
        expect(page.getByLabel('Subscribe to newsletter')).toBeChecked(); // Assert the checked state
        await page.getByLabel('XL').check(); // Select the radio button

        // Select options
        await page.getByLabel('Choose a color').selectOption('blue'); // Single selection matching the value or label
        await page.getByLabel('Choose a color').selectOption({ label: 'Blue' }); // Single selection matching the label
        await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']); // Multiple selected items

        // Mouse click
        await page.getByRole('button').click(); // Generic click
        await page.getByText('Item').dblclick(); // Double click
        await page.getByText('Item').click({ button: 'right' }); // Right click
        await page.getByText('Item').click({ modifiers: ['Shift'] }); // Shift + click
        await page.getByText('Item').click({ modifiers: ['ControlOrMeta'] }); // Ctrl + click or Windows and Linux, Meta + click on macOS
        await page.getByText('Item').hover(); // Hover over element
        await page.getByText('Item').click({ position: { x: 0, y: 0 } }); // Click the top left corner

        // Forcing the click
        await page.getByRole('button').click({ force: true });

        // Programmatic click
        await page.getByRole('button').dispatchEvent('click');

        // Type characters
        await page.locator('#area').pressSequentially('Hello World!'); // Press keys one by one

        // Keys and shortcuts
        await page.getByText('Submit').press('Enter'); // Hit Enter
        await page.getByRole('textbox').press('Control+ArrowRight'); // Dispatch Control+Right
        await page.getByRole('textbox').press('$'); // Press $ sign on keyboard

        Can use Shift, Control, Alt, Meta, 
        Backquote, Minus, Equal, Backslash, Backspace, Tab, Delete, Escape,
        ArrowDown, End, Enter, Home, Insert, PageDown, PageUp, ArrowRight,
        ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc.
        "a"..."Z"
        "Control+o", "Control+Shift+T"

        // Upload files
        await page.getByLabel('Upload file').setInputFiles(path.join(__dirname, 'myfile.pdf')); // Select one file
        await page.getByLabel('Upload files').setInputFiles([
          path.join(__dirname, 'file1.txt'),
          path.join(__dirname, 'file2.txt'),
        ]); // Select multiple files
        await page.getByLabel('Upload directory').setInputFiles(path.join(__dirname, 'mydir')); // Select a directory
        await page.getByLabel('Upload file').setInputFiles([]); // Remove all the selected files
        await page.getByLabel('Upload file').setInputFiles({
          name: 'file.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('this is test')
        }); // Upload buffer from memory

        // If you don't have input element in hand (it is created dynamically)
        // Start waiting for file chooser before clicking. Note no await.
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.getByLabel('Upload file').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(__dirname, 'myfile.pdf'));

        // Focus element
        await page.getByLabel('Password').focus();

        // Drag and Drop
        await page.locator('#item-to-be-dragged').dragTo(page.locator('#item-to-drop-at'));

        // Dragging manually
        await page.locator('#item-to-be-dragged').hover();
        await page.mouse.down();
        await page.locator('#item-to-drop-at').hover();
        await page.mouse.up();

        // Scrolling (usually Playwright does it automatically)
        await page.getByText('Footer text').scrollIntoViewIfNeeded(); // Scroll the footer into view, forcing an "infinite list" to load more content
        // Position the mouse and scroll with the mouse wheel
        await page.getByTestId('scrolling-container').hover();
        await page.mouse.wheel(0, 10);
        // Alternatively, programmatically scroll a specific element
        await page.getByTestId('scrolling-container').evaluate(e => e.scrollTop += 100);
      `}</Code>

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
        <li>After setup test is run it will populate following file with auth tokens</li>
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

        <li>To avoid authentication we may create a file with empty tokens</li>

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
          For different auth roles you just do multiple login setup function which create different
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
          And you to those files in <code>storageState</code> in tests or test groups, instead of
          setting it globally in the config.
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

        <li>To test how users with different roles interact together in a single test</li>

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
