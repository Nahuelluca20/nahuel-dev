export default function ListSkeleton() {
  const items = Array.from({ length: 4 }, (_, index) => index);
  return (
    <ul className="list-disc space-y-2 w-full">
      {items.map((item, index) => (
        <li key={index} className="w-full">
          <div className="animate-pulse flex space-x-4 w-full">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="h-[20px] bg-slate-400 py-1 w-full rounded col-span-2"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
