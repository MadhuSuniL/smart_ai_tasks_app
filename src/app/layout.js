import "./globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Meta & SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Smart AI Tasks – Plan Smarter with Context</title>
        <meta
          name="description"
          content="Smart AI Tasks lets you turn notes, emails, and chats into actionable tasks using intelligent context processing."
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* Social Meta */}
        <meta property="og:title" content="Smart AI Tasks – Plan Smarter with Context" />
        <meta
          property="og:description"
          content="Generate, prioritize, and manage tasks using AI from any context — notes, emails, or chats."
        />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smart AI Tasks – Plan Smarter with Context" />
        <meta
          name="twitter:description"
          content="AI-powered task planner that understands your messy notes and turns them into actionable items."
        />
        <meta name="twitter:image" content="/preview.png" />
        <meta name="theme-color" content="#ec4899" />
      </head>

      <body className="h-dvh bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black text-black dark:text-white transition-all font-[Comfortaa]">
        <div className="flex flex-col h-dvh">
          {/* Sticky Header */}
          {true && (
            <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 shadow-sm bg-white/80 dark:bg-black/70 backdrop-blur-md sticky top-0 z-50">
              <a href="/">
                <h1 className="text-2xl font-extrabold text-pink-600 tracking-wide md:ml-20">
                  Smart AI Tasks
                </h1>
              </a>
              <DarkModeToggle />
            </header>
          )}

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto w-full">
            <div className="px-4 py-6 max-w-7xl mx-auto ">{children}</div>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </body>
    </html>
  );
}
