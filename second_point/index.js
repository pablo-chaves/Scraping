const puppeteer = require('puppeteer')
const fs = require('fs')

async function saveProducts (page) {
  let products = await page.evaluate(async () => {
    const container = document.querySelector('#gallery-layout-container')
    window.scrollTo(0, document.body.offsetHeight)
    await new Promise(r => setTimeout(r, 2800))

    const elements = container.querySelectorAll(':scope .vtex-search-result-3-x-galleryItem > section > a > article > div')

    const dataElements = []
    for (const element of elements) {
      const name = element.querySelector('div > h3 > span')
      let price = element.querySelector('div > #items-price')

      if (price.textContent.includes('Regular')) {
        price = element.querySelector('div > #items-price > div > div')
      }
      dataElements.push({
        name: name && name.textContent,
        price: price && price.textContent.replace(/\u00A0/, " ")
      })
    }

    return dataElements
  })

  const next = await page.evaluate(() => {
    const next = document.querySelector('[rel=next]')
    return next && next.href
  })

  let productsNext = []
  if (next) {
    await page.goto(next)
    await page.waitForSelector('#gallery-layout-container')
    productsNext = await saveProducts(page)
  }

  products = [...products, ...productsNext]

  return products
}

async function start (url) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })

  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
  await page.goto(url, [
    0,
    { waitUntil: "domcontentloaded" }
  ])
  await page.waitForSelector('#gallery-layout-container')

  const result = {
    url,
    products: []
  }

  const products = await saveProducts(page)
  
  result.products = products

  await browser.close()
  return result
}


const url = 'https://www.tiendasjumbo.co/supermercado/despensa/enlatados-y-conservas'

start(url).then((result) => {
  const data = JSON.stringify(result);
  fs.writeFileSync('./data_results/result.json', data);

  console.log('Job finished...')
  process.exit(0)
}).catch(err => {
  console.log(err)
})
