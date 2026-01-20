import { AppHeader } from '@/components/app/header';
import { SahajApp } from '@/components/app/sahaj-app';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8">
        <SahajApp />
      </main>
    </div>
  );
}
