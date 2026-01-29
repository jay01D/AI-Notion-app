import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";


export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12" />
      <p className="font-bold">Get Started with creating a New Document</p>
    </main>
  );
}
