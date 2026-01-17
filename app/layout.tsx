// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "GruntWrk",
  description: "Get work done. Find work fast.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
