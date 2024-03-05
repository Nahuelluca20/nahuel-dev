export default function ListSkeleton() {
  const items = Array.from({ length: 5 }, (_, index) => index);
  return (
    <ul className="list-disc space-y-2 w-full">
      {items.map((item, index) => (
        <li key={index} className="w-[240px] md:w-[300px] h-[24px]">
          <div className="animate-pulse flex space-x-4 w-full">
            <div className="w-full">
              <div className="h-2 bg-slate-400 py-1 w-full rounded-md col-span-2"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
