"use server";
import User from "@/lib/models/User";
import { jwtVerify } from "jose";
import { getCookie, setCookie } from "./cookie";

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

    const user = await User.findById(verifiedToken.payload?._id);

    return {
      error: false,
      payload: user,
      role: user.role,
      id: user._id,
      siteId: user.siteId,
    };
  } catch (err) {
    return {
      error: true,
      payload: null,
    };
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
