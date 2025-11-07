import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid h-screen w-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden h-full w-full lg:block">
        <Image src="/login-bg.jpg" alt="bg" fill />
      </div>
      <div className="flex w-full items-center justify-center lg:items-start lg:pt-[30vh]">
        {children}
      </div>
    </main>
  );
}
