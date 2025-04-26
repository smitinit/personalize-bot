import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Form from "./_components/Form";

export default async function Dashboard() {
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
          <Button
            // onClick={handleSave}
            // disabled={isSaving}
            className="w-full md:w-auto"
          >
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>

        <Form />
      </div>
    </main>
  );
}
