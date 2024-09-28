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
        String <code>should be logged in</code> will be visible in test logs
      </p>

      <Code block jsx>{`
        await expect(page.getByText('Name'), 'should be logged in').toBeVisible()
      `}</Code>

      <H>Locators</H>

      <Lnk path="https://playwright.dev/docs/locators">https://playwright.dev/docs/locators</Lnk>

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
