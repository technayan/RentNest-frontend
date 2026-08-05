export default function DashboarTitle({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <hr />
    </div>
  );
}
