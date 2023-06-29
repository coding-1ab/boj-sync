import puppeteer, { type Page } from 'puppeteer'

const goto = (page: Page, url: string) =>
	Promise.all([
		page.goto(url, {
			timeout: 10000,
		}),
		page.waitForNavigation({
			waitUntil: 'networkidle2',
		}),
	])

const browser = await puppeteer.launch({
	headless: false,
	// headless: true,
})

const page = await browser.newPage()
await goto(page, 'https://www.acmicpc.net/login')
await page
	.locator('#login_form > div:nth-child(2) > input')
	.fill('abiriadev')
await page
	.locator('#login_form > div:nth-child(3) > input')
	.fill('791346561973baekjoon')

await page.locator('#submit_button').click()

const capelem = await page.waitForSelector(
	'body > div:nth-child(22) > div:nth-child(2) > iframe',
	{
		timeout: 1000,
	},
)

console.log('cap detection end!')
console.log(capelem)

// if (capelem) {
// 	await browser.close()
// } else {
// 	await goto(
// 		page,
// 		'https://www.acmicpc.net/group/practice/15547',
// 	)
//
// 	console.log('goto end!')
//
// 	await page.screenshot({
// 		path: 'scrnsht.png',
// 	})
// 	// await browser.close()
// }
