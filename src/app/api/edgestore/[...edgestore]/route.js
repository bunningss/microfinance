import { getRole } from "@/utils/auth";
import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { z } from "zod";

const es = initEdgeStore.context().create();

const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket()
    .input(
      z.object({
        category: z.string(),
      })
    )
    .path(({ ctx, input }) => [{ author: ctx.siteId }]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,

  createContext: async (req, res) => {
    const { siteId, id, role } = await getRole();

    return {
      userId: id ? id : "invalid-user",
      userRole: role ? role : "user",
      siteId: siteId ? siteId : "unavailable",
    };
  },
});

export { handler as GET, handler as POST };
