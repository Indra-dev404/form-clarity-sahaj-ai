'use client';

import { AppHeader } from "@/components/app/header";
import { SahajApp } from "@/components/app/sahaj-app";
import { useAuth } from "@/components/app/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg_home.png')" }}
    >
      <AppHeader />

      <main className="flex-grow flex items-center justify-center p-4">
        {/* Glass Card */}
        <div className="
          w-full max-w-xl
          rounded-2xl
          bg-white/60
          backdrop-blur-xl
          border border-white/30
          shadow-xl
        ">
          <SahajApp />
        </div>
      </main>
    </div>
  );
}
