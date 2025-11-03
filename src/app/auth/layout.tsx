import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative w-full h-full hidden lg:block">
        <Image src="/login-bg.jpg" alt="bg" fill />
      </div>
      <div className="w-full flex justify-center items-center">{children}</div>
    </main>
  );
}
