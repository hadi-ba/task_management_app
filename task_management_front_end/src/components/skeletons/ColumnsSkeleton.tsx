import { Skeleton } from "@/components/ui/skeleton";

const ColumnsSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Array.from({ length: 4 }).map(() => (
          <div>
            <Skeleton className=" w-72 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]"></Skeleton>
            <Skeleton className="rounded-full bg-red" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnsSkeleton;
