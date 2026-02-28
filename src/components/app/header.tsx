'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-context";
import { LogOut, Bot } from "lucide-react";

export function AppHeader() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <header className="py-4 px-6 border-b print:hidden sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3">
        <Image
            src="/logof.png"
            alt="Sahaj AI Logo"
            width={40}
            height={40}
            priority
        />
          <h1 className="text-2xl font-headline font-bold text-foreground">
            Sahaj AI
          </h1>
        </Link>

        {isAuthenticated && (
          <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        )}

      </div>
    </header>
  );
}
