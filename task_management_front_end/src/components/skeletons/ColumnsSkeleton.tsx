import { Skeleton } from "@/components/ui/skeleton";

const ColumnsSkeleton = () => {
  return (
    <div className="p-6 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <Skeleton className=" w-72 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]"></Skeleton>
            <Skeleton className="rounded-full bg-red dark:bg-dark-grey" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnsSkeleton;
