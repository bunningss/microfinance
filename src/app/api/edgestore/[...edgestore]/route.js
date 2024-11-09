import { getSession } from "@/utils/auth";
import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

async function createContext() {
  const { id, role, siteId } = await getSession();

  return {
    userId: id ? id : "user-123",
    userRole: role ? role : "user",
    siteId: siteId ? siteId : "invalid-site",
  };
}

const es = initEdgeStore.context().create();

const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket()
    .path(({ ctx, input }) => [{ author: ctx.siteId }]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});
export { handler as GET, handler as POST };
