import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2">Sorry, we couldn't find what you were looking for.</p>
      <Link href="/" className="mt-4 inline-block underline">
        Back home
      </Link>
    </main>
  );
}
