import Link from "next/link";
import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span className="text-sm font-medium">BotPersona</span>
          </div>

          <nav className="text-muted-foreground flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Documentation
            </Link>
          </nav>

          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Personalized Bot. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
