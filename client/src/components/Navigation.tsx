import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, Orbit } from "lucide-react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="flex items-center justify-between px-16 py-4 h-[100px] ">
      <Link href="/" className="flex-1 cursor-pointer">
        <p className="flex items-center gap-2 font-semibold text-2xl">
          ContextAI <Orbit />
        </p>
      </Link>
      <div className="flex flex-none items-center">
        <Button variant="link">Product</Button>
        <Button variant="link">Pricing</Button>
        <Button variant="link">About</Button>
      </div>
      <div className="flex flex-1 justify-end gap-2">
        <Link href="/sign-in">
          <Button variant="link">Sign in</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="default">
            Get Started <ArrowRight />
          </Button>
        </Link>
      </div>
    </nav>
  );
}
