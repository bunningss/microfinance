"use server";

import { getCookie } from "./cookie";

async function getAuthToken() {
  return await getCookie("ze-session");
}

export async function postData(url, data) {
  const token = await getAuthToken();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "auth-token": `Bearer ${token}`,
    },
  });
  const resData = await res.json();

  if (!res.ok) {
    return {
      error: true,
      response: resData,
    };
  }

  return {
    error: false,
    response: resData,
  };
}

export async function getData(url, revalidate = 300) {
  const token = await getAuthToken();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "GET",
    headers: {
      "auth-token": `Bearer ${token}`,
    },
    next: { revalidate: revalidate },
  });

  const resData = await res.json();

  if (!res.ok) {
    return {
      error: true,
      response: resData,
    };
  }

  return {
    error: false,
    response: resData,
  };
}

export async function putData(url, data) {
  const token = await getAuthToken();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "PUT",
    headers: {
      "auth-token": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) {
    return {
      error: true,
      response: resData,
    };
  }

  return {
    error: false,
    response: resData,
  };
}

export async function deleteData(url, data) {
  const token = await getAuthToken();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "DELETE",
    headers: {
      "auth-token": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) {
    return {
      error: true,
      response: resData,
    };
  }

  return {
    error: false,
    response: resData,
  };
}
