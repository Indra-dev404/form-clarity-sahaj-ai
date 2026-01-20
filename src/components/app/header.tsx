import { FileQuestion } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-4 px-6 border-b print:hidden sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto flex items-center gap-3">
        <FileQuestion className="text-primary h-7 w-7" />
        <h1 className="text-2xl font-headline font-bold text-foreground">
          Sahaj AI
        </h1>
      </div>
    </header>
  );
}
