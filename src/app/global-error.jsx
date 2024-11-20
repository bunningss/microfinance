"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <main className="h-full w-full flex justify-center items-center">
          <h2 className="text-3xl">{error.message}</h2>
        </main>
      </body>
    </html>
  );
}
