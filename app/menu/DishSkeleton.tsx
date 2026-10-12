export default function DishSkeleton() {
  return (
    <ul className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <li key={i} className="flex items-center gap-2">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}
