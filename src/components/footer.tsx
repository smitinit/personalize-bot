import Link from "next/link";
import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="flex flex-row items-center justify-around gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span className="text-sm font-medium">BotPersona</span>
        </div>

        <nav className="text-muted-foreground flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/" className="hover:text-primary">
            Terms
          </Link>
          <Link href="/" className="hover:text-primary">
            Documentation
          </Link>
        </nav>

        <div className="text-muted-foreground text-center text-sm md:text-right">
          &copy; {new Date().getFullYear()} Personalized Bot. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
