import { ScheduleProvider } from "@/context/ScheduleContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ScheduleProvider>{children}</ScheduleProvider>
      </body>
    </html>
  );
}
