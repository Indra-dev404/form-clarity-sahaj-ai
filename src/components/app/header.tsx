import Image from "next/image";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="py-4 px-6 border-b print:hidden sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto flex items-center gap-3">
        
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo1.png"
            alt="Sahaj AI Logo"
            width={40}
            height={40}
            priority
          />
          <h1 className="text-2xl font-headline font-bold text-foreground">
            Sahaj AI
          </h1>
        </Link>

      </div>
    </header>
  );
}
