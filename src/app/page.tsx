import Link from "next/link";
import { ArrowRight, Bot, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Personalize Your AI Bot Experience
              </h1>
              <p className="text-muted-foreground max-w-[700px] text-lg">
                Create, customize, and deploy your own AI bot with just a few
                clicks. No coding required.
              </p>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/">Documentation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Features
              </h2>
              <p className="text-muted-foreground max-w-[700px] text-lg">
                Everything you need to create and deploy your personalized AI
                bot
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col border-l-4 border-blue-400 bg-slate-50 p-6 dark:bg-slate-900">
                <Sparkles className="text-primary mb-4 h-6 w-6" />
                <h3 className="mb-2 text-xl font-semibold">Personalization</h3>
                <p className="text-muted-foreground mb-2">
                  Customize your bot&apos;s personality, knowledge, and
                  responses
                </p>
                <p className="text-muted-foreground text-sm">
                  Define your bot&sapos;s thesis, tone, and expertise to create
                  a unique AI assistant that represents your brand.
                </p>
              </div>

              <div className="flex flex-col border-l-4 border-cyan-400 bg-slate-50 p-6 dark:bg-slate-900">
                <Bot className="text-primary mb-4 h-6 w-6" />
                <h3 className="mb-2 text-xl font-semibold">Easy Integration</h3>
                <p className="text-muted-foreground mb-2">
                  Integrate with your website or app in minutes
                </p>
                <p className="text-muted-foreground text-sm">
                  Simple API and widgets make it easy to add your personalized
                  bot to any platform.
                </p>
              </div>

              <div className="flex flex-col border-l-4 border-blue-400 bg-slate-50 p-6 md:col-span-2 lg:col-span-1 dark:bg-slate-900">
                <Code className="text-primary mb-4 h-6 w-6" />
                <h3 className="mb-2 text-xl font-semibold">
                  Developer Friendly
                </h3>
                <p className="text-muted-foreground mb-2">
                  Powerful API for advanced customization
                </p>
                <p className="text-muted-foreground text-sm">
                  Access advanced features through our comprehensive API with
                  secure key management.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
