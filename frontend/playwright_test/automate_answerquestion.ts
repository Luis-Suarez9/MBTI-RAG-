import { chromium } from 'playwright';

// ─────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────
const BASE_URL = 'http://localhost:3000';          // running Next.js dev server
const TOTAL_PAGES = 8;                             // 8 modules
const QUESTIONS_PER_PAGE = 6;                      // 6 questions per module
const SCALE_VALUES = [-3, -2, -1, 0, 1, 2, 3];    // radio values matching scaleOptions

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function log(msg: string) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${msg}`);
}

// ─────────────────────────────────────────────────────────────────
// Main automation
// ─────────────────────────────────────────────────────────────────
(async () => {
  log('Launching Chromium browser...');
  const browser = await chromium.launch({
    headless: false,           // set true if you want fully headless
    slowMo: 200,               // slow down so you can visually trace what happens
  });

  // When the user manually closes the browser window, Playwright emits
  // the 'disconnected' event. Resolve the script when that happens so
  // the user can close the browser to stop the automation.
  browser.on('disconnected', () => {
    log('Browser disconnected by user — exiting script.');
    // Allow a short delay for logs to flush, then exit.
    setTimeout(() => process.exit(0), 50);
  });

  const page = await browser.newPage();

  // Step 1: Navigate to homepage
  log(`Navigating to homepage -> ${BASE_URL}`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  log('Homepage loaded');

  // Step 2: Click "Try the test?" link
  log('Looking for "Try the test?" link...');
  const tryTestLink = page.getByRole('link', { name: /try the test/i });
  await tryTestLink.waitFor({ state: 'visible', timeout: 10000 });
  log('Clicking "Try the test?" link...');
  await tryTestLink.click();

  // Step 3: Wait for /modules-test to load
  await page.waitForURL(`${BASE_URL}/modules-test`, { timeout: 15000 });
  log('Arrived at /modules-test');

  // Step 4: Iterate through all 8 pages
  for (let pageNum = 1; pageNum <= TOTAL_PAGES; pageNum++) {
    log(`--- Page ${pageNum} of ${TOTAL_PAGES} --- answering ${QUESTIONS_PER_PAGE} questions randomly`);

    // Answer each question on this page
    for (let qIdx = 0; qIdx < QUESTIONS_PER_PAGE; qIdx++) {
      const randomValue = randomChoice(SCALE_VALUES);
      const radioName  = `question-${pageNum}-${qIdx}`;

      log(`  Q${qIdx + 1}: selecting value=${randomValue} (name=${radioName})`);

      // The radio inputs are visually hidden (sr-only); click the wrapping label
      const labelLocator = page.locator(
        `label:has(input[type="radio"][name="${radioName}"][value="${randomValue}"])`
      );
      await labelLocator.scrollIntoViewIfNeeded();
      await labelLocator.waitFor({ state: 'visible', timeout: 8000 });
      await labelLocator.click();
      log(`  Q${qIdx + 1}: answered with value=${randomValue}`);
    }

    // Step 5: Click Next / Submit
    const isLastPage = pageNum === TOTAL_PAGES;
    const btnLabel   = isLastPage ? /submit results/i : /next page/i;

    log(`Clicking "${isLastPage ? 'Submit Results' : 'Next Page'}" button...`);
    const navBtn = page.getByRole('button', { name: btnLabel });
    await navBtn.waitFor({ state: 'visible', timeout: 8000 });
    await navBtn.click();

    if (!isLastPage) {
      const nextPageText = `Page ${pageNum + 1} of 8`;
      await page.waitForFunction(
        (text: string) => document.body.innerText.includes(text),
        nextPageText,
        { timeout: 10000 }
      );
      log(`Moved to page ${pageNum + 1}`);
    } else {
      log('Waiting for post-submit navigation (to /test-detail)...');
      try {
        await page.waitForURL((url) => !url.pathname.includes('/modules-test'), { timeout: 20000 });
        log(`Navigation after submit -> ${page.url()}`);
      } catch {
        log(`Navigation timeout - current URL: ${page.url()}`);
        const bodyText = await page.textContent('body');
        log(`Page content snippet: ${bodyText?.slice(0, 300)}`);
      }
    }
  }

  log('Automation complete! Leaving browser open. Close the browser to stop the script.');
  // Wait until the browser is closed by the user (disconnected event)
  await new Promise<void>((resolve) => {
    browser.once('disconnected', () => resolve());
  });
})();


//npx ts-node playwright_test/automate_answerquestion.ts  