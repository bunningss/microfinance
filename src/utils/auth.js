"use server";
import User from "@/lib/models/User";
import { jwtVerify } from "jose";
import { getCookie, setCookie } from "./cookie";

export async function decryptToken() {
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
    };
  } catch (err) {
    return {
      error: true,
      payload: null,
    };
  }
}

export async function getRole() {
  try {
    const user = await decryptToken();
    const dbUser = await User.findById(user.payload?._id);

    return { role: dbUser.role, id: dbUser._id, siteId: dbUser.siteId };
  } catch (err) {
    return { role: null, id: null };
  }
}

export async function verifyToken(request) {
  try {
    const token = await request.headers.get("auth-token");
    const sessionKey = token?.split(" ")[1];

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

    return {
      error: false,
      payload: verifiedToken.payload,
    };
  } catch (err) {
    return {
      error: true,
      payload: null,
    };
  }
}

export async function logout() {
  await Promise.all([setCookie("ze-session", "", 0)]);
}
