import Form from "./_components/Form";

import { auth } from "@clerk/nextjs/server";
import { saveDefaultToDb } from "@/server/queries";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();
  if (userId) {
    await saveDefaultToDb(userId);
    // const res = await getAllBotUserValues(userId);
    // console.log(res);
  } else {
    redirect("/");
  }

  return (
    <main className="flex w-full justify-center p-2">
      <div className="w-full lg:w-[80%]">
        <Form />
      </div>
    </main>
  );
}
