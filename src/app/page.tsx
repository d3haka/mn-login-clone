import SharedLayoutAnimation from "@/components/tab-sample";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth");
  // return (
  //   <div className="flex h-screen w-screen items-center justify-center">
  //     <SharedLayoutAnimation />
  //   </div>
  // );
}
