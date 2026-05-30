import { chromium } from 'playwright'

const BASE_URL = 'http://localhost:3100'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto(`${BASE_URL}/apps`, { waitUntil: 'load', timeout: 30000 })

const links = await page.evaluate(() =>
  Array.from(document.querySelectorAll('a[href*="/apps/"]'))
    .map(a => a.href)
    .filter(h => !h.endsWith('/apps') && !h.includes('?'))
    .slice(0, 2)
)
console.log('App links:', links)

if (links.length > 0) {
  await page.goto(links[0], { waitUntil: 'load', timeout: 30000 })
  await page.waitForTimeout(2000)
  const buttons = await page.evaluate(() =>
    Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.textContent?.trim().slice(0, 50),
      ariaLabel: b.getAttribute('aria-label'),
      visible: b.offsetParent !== null
    }))
  )
  console.log('\nButtons on app detail page:')
  buttons.forEach(b => console.log(JSON.stringify(b)))
} else {
  console.log('No approved apps found on /apps page — checking page content')
  const text = await page.textContent('body')
  console.log('Page text snippet:', text.slice(0, 500))
}
await browser.close()
