export default function CategoryBar({ categories }: { categories: string[] }) {
  return (
    <div className="my-4 flex gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className="rounded bg-gray-200 px-3 py-1 text-sm text-black"
        >
          {category}
        </span>
      ))}
    </div>
  );
}
