export default function ListSkeleton() {
  const items = Array.from({ length: 5 }, (_, index) => index);
  return (
    <ul className="list-disc">
      {items.map((item, index) => (
        <li key={index}>
          <div className="animate-pulse flex space-x-4 w-full">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="h-2 bg-slate-700 py-1 w-full rounded col-span-2"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
