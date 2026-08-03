export default function PropertySkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid gap-6">
        <div className="h-80 animate-pulse rounded-2xl bg-muted"></div>
        <div className="h-10 animate-pulse rounded-2xl bg-muted"></div>
        <div className="h-5 animate-pulse rounded-2xl bg-muted"></div>
        <div className="h-10 animate-pulse rounded-2xl bg-muted"></div>
        <div className="h-5 animate-pulse rounded-2xl bg-muted"></div>
        <div className="h-30 animate-pulse rounded-2xl bg-muted"></div>
      </div>
      <div className="lg:col-span-1">
        <div className="h-80 animate-pulse rounded-2xl bg-muted"></div>
      </div>
    </div>
  );
}
