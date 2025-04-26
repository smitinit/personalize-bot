import { db } from "@/server/db";
import { bot } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("upload thing completed id: ", metadata.userId);

      console.log("upload for db started id: ", metadata.userId);
      const existingBot = await db
        .select()
        .from(bot)
        .where(eq(bot.botId, metadata.userId));

      if (existingBot.length > 0) {
        // Update existing row
        await db
          .update(bot)
          .set({
            botavatarURL: file.ufsUrl,
            updatedAt: new Date(),
          })
          .where(eq(bot.botId, metadata.userId));
      } else {
        // Insert new row
        await db.insert(bot).values({
          botId: metadata.userId,
          botavatarURL: file.ufsUrl,
          updatedAt: new Date(),
          apiKey: "",
        });
      }

      console.log("upload for db finished id: ", metadata.userId);
      console.log("file url: ", file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
