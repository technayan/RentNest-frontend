export function RequestListSkeleton() {
  return (
    <div className="flex flex-col gap-6 my-6 md:my-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-38 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  );
}
