import { AppHeader } from "@/components/app/header";
import { SahajApp } from "@/components/app/sahaj-app";

export default function HomePage() {
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
