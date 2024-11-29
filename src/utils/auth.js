"use server";
import Staff from "@/lib/models/Staff";
import { jwtVerify } from "jose";
import { getCookie, setCookie } from "./cookie";
import { roles } from "@/lib/static";
import { connectDb } from "@/lib/db/connectDb";

export async function getSession() {
  const session = await getCookie("ze-session");

  if (!session)
    return {
      error: true,
      payload: null,
    };

  try {
    const verifiedToken = await jwtVerify(
      session,
      new TextEncoder().encode(process.env.TOKEN_SECRET),
      {
        algorithms: ["HS256"],
      }
    );

    return {
      error: false,
      payload: verifiedToken.payload,
      role: verifiedToken.payload.role,
      id: verifiedToken.payload._id,
      siteId: verifiedToken.payload.siteId,
    };
  } catch (err) {
    return {
      error: true,
      payload: null,
    };
  }
}

export async function verifyToken(request, action) {
  try {
    if (!action) throw new Error("আপনি অনুমোদিত নন।");

    const token = await request.headers.get("auth-token");
    const sessionKey = token?.split(" ")[1];

    await connectDb();

    if (!sessionKey)
      return {
        error: true,
        payload: null,
      };
    const verifiedToken = await jwtVerify(
      sessionKey,
      new TextEncoder().encode(process.env.TOKEN_SECRET),
      {
        algorithms: ["HS256"],
      }
    );

    await checkPermission(action, verifiedToken.payload?._id);

    return {
      error: false,
      payload: verifiedToken.payload,
      id: verifiedToken.payload?._id,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function logout() {
  await setCookie("ze-session", "", 0);
}

export const checkPermission = async (action, id) => {
  const user = await Staff.findById(id).lean();

  const rolePermissions = roles[user.role];
  if (!rolePermissions) {
    throw new Error(`"আপনি অনুমোদিত নন।"`);
  }

  if (rolePermissions.can?.includes("manage:all")) {
    return true;
  }

  if (rolePermissions.can?.includes(action)) {
    return true;
  }

  if (rolePermissions.cannot?.includes(action)) {
    throw new Error(`"আপনি অনুমোদিত নন।"`);
  }

  throw new Error(`"আপনি অনুমোদিত নন।"`);
};
