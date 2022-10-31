const puppeteer = require('puppeteer')
const fs = require('fs')

async function start () {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
  await page.goto('https://www.soriana.com/')

  const result = {
    department: 'Despensa',
    url: 'https://www.soriana.com/despensa/',
    categories: []
  }

  result.categories = await page.evaluate(() => {
    const elements = document.querySelectorAll('#cat-despensa > li')

    const dataElements = []
    for (const element of elements) {
      const name = element.querySelector('a').textContent

      if (name.trim() === 'Despensa') continue

      const nodelist = element.querySelectorAll('ul > li')
      const subcategories = []

      for (const item of nodelist) {
        const tagA = item.querySelector('a')
        subcategories.push({
            name: tagA.textContent.trim(),
            url: tagA.href,
          })
      }

      dataElements.push({
        name: name.trim(),
        url: element.querySelector('a').href,
        subcategories
      })
    }

    return dataElements
  })

  await browser.close();
  return result
}

start().then((result) => {
  const data = JSON.stringify(result)
  fs.writeFileSync('./data_results/despensa.json', data)

  console.log('Job finished...')
  process.exit(0)
}).catch(err => {
  console.log(err)
})
