import Form from "./_components/Form";

import { auth } from "@clerk/nextjs/server";
import { saveDefaultToDb } from "@/server/queries";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();
  if (userId) {
    await saveDefaultToDb(userId);
  } else {
    redirect("/");
  }

  return (
    <main className="flex w-full justify-center p-2">
      <div className="w-full space-y-8 md:py-10 lg:w-[80%]">
        <div className="mb-6 flex flex-row items-center justify-between md:mb-8">
          <div className="">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Bot Dashboard
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Customize your bot&apos;s personality and behavior
            </p>
          </div>
        </div>

        <Form />
      </div>
    </main>
  );
}
