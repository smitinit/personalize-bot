import Link from "next/link";
import { ArrowRight, Bot, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="py-8 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Personalize Your AI Bot Experience
              </h1>
              <p className="text-muted-foreground mx-auto max-w-[700px] text-sm md:text-base lg:text-xl">
                Create, customize, and deploy your own AI bot with just a few
                clicks. No coding required.
              </p>
            </div>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/">Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 w-full py-8 md:py-16 lg:py-24">
        <div className="px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Features
            </h2>
            <p className="text-muted-foreground max-w-[85%] text-sm md:text-base lg:text-xl">
              Everything you need to create and deploy your personalized AI bot
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-3 lg:py-12">
            <Card>
              <CardHeader className="pb-2">
                <Sparkles className="text-primary mb-2 h-6 w-6" />
                <CardTitle>Personalization</CardTitle>
                <CardDescription>
                  Customize your bot&apos;s personality, knowledge, and
                  responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Define your bot&apos;s thesis, tone, and expertise to create a
                  unique AI assistant that represents your brand.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Bot className="text-primary mb-2 h-6 w-6" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Integrate with your website or app in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Simple API and widgets make it easy to add your personalized
                  bot to any platform.
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <Code className="text-primary mb-2 h-6 w-6" />
                <CardTitle>Developer Friendly</CardTitle>
                <CardDescription>
                  Powerful API for advanced customization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Access advanced features through our comprehensive API with
                  secure key management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
