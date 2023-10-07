import "./globals.css"

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
      <body>{children}</body>
    </html>
  )
}
