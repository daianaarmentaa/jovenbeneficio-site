export default function SectionHeader({ title, subtitle }: { title: string; subtitle:string }) {
  return (
    <div className="pb-4 border-b border-base-300">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-base-content/70 mt-1">{subtitle}</p>
    </div>
  );
}