import { defaultLocale } from "./lib/messages";

/**
 * Root redirect: instance meta-refresh instead of client-side JS redirect.
 * Saves ~200ms by avoiding JS execution.
 */
export default function RootRedirect() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}`} />
        <script dangerouslySetInnerHTML={{ __html: `location.replace("/${defaultLocale}")` }} />
      </head>
      <body />
    </html>
  );
}
