//https://applis.io/posts/nextjs-generate-image-from-html
import { GetServerSideProps } from 'next'
import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const Image: React.FC = () => {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}): Promise<any> => {
  const { title } = params

  if (!title) {
    res.statusCode = 400
    res.end('Bad Request')
    return { props: {} }
  }

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: 1600, height: 900 },
    executablePath: await chromium.executablePath,
    headless: true,
  })

  const html = `<html>
      <head>
        <style>
        body {
          width: 100vw;
          height: 100vh;
          background-color: #f9fafb;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div {
          color: #374151;
          font-size: 3rem;
          font-weight: bold;
          line-height: 1.5;
        }
        </style>
      </head>
      <body>
        <div>${title}</div>
      </body>
    </html>`

  const page = await browser.newPage()
  await page.setContent(html)
  const buffer = await page.screenshot()

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
  res.end(buffer, 'binary')

  return { props: {} }
}

export default Image