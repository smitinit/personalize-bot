import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export the API route
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
