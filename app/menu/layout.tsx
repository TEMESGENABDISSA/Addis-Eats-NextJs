import Link from "next/link";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 border-r p-4">
        <h2 className="mb-4 font-bold">Menu Navigation</h2>
        <Link
          href="/"
          className="mt-6 block text-sm text-gray-600 hover:underline"
        >
          ← Back to home
        </Link>
      </aside>
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
