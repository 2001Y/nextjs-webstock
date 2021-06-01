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
    defaultViewport: { width: 1400, height: 735 },
    executablePath: await chromium.executablePath,
    headless: true,
  })

  const html = `<html>
      <head>
        <style>
        @font-face {
          font-family: 'Noto Sans JP';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(/ogp/font.woff2) format('woff2');
        }
        :root {
          font-size: 2em;
        }
        body {
          font-family: monospace,'Noto Sans JP',"游ゴシック", "Yu Gothic", YuGothic;
          color: #000;
          width: 100vw;
          height: 100vh;
          background-color: #f2f2eb;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        section {
          max-wight: 90%;
          margin-right: 3rem;
        }
        h1 {
          letter-spacing: -0.03em;
          font-feature-settings: "palt";
          font-size: 2.3rem;
          font-weight: bold;
          margin: 0 0 1rem 0;
        }
        span {
          font-size: 3.5rem;
          margin-left: .1em;
        }
        p {
          color: #535353;
          line-height: 1.5;
        }
        b {
          font-size: 1.1em;
          margin: 0 .5em;
          letter-spacing: -0.03em;
        }
        .right {
          margin: 0 .5em 0 0;
        }        
        </style>
      </head>
      <body>
        <section>
          <h1>webstock.dev/<span>${title}</span></h1>
          <p>
            <b class=right>webstock.dev</b>は<b>Gist</b>をデータベースに、<br>
            お気に入りの<b>Web</b>サイトをサムネと共にストックすることができます。
          </p>
        </section>
      </body>
    </html>`

  const page = await browser.newPage()
  await page.setContent(html,{waitUntil:'domcontentloaded'})
  const buffer = await page.screenshot()

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
  res.end(buffer, 'binary')

  return { props: {} }
}

export default Image