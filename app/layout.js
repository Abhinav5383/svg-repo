import "./globals.css"
import Script from "next/script"

export const metadata = {
  title: 'My Icons',
  description: 'A collection of icons',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>

      <body>
        {children}
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8708861413425372"
          crossorigin="anonymous" />
      </body>
    </html>
  )
}
