import { AppHeader } from "@/components/app/header";
import { SahajApp } from "@/components/app/sahaj-app";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow flex items-center justify-center p-4">
        <SahajApp />
      </main>
    </div>
  );
}
