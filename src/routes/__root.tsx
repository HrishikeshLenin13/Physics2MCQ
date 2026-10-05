import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Circuit Review";
const THEME_BOOT =
  "(function(){try{var t=localStorage.getItem('circuits-theme');if(t){var p=JSON.parse(t);if(p&&(p.state&&p.state.theme==='dark'||p==='dark')){document.documentElement.setAttribute('data-theme','dark');return}}}catch(e){}document.documentElement.setAttribute('data-theme','light');})();";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Interactive Unit 03.11 quiz on current and circuits — 50 multiple-choice questions with review and retest.",
      },
      { name: "theme-color", content: "#f3efe6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
