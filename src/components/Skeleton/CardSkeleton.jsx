const ContestCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="card bg-base-200 shadow-xl rounded-md overflow-hidden animate-pulse"
        >
          {/* IMAGE */}
          <div className="h-40 bg-base-300"></div>

          {/* BODY */}
          <div className="p-2 space-y-3">
            {/* TITLE + BADGE */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-2/3 bg-base-300 rounded"></div>
              <div className="h-5 w-10 bg-base-300 rounded-full"></div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-base-300 rounded"></div>
              <div className="h-3 w-4/5 bg-base-300 rounded"></div>
            </div>

            {/* BUTTON */}
            <div className="h-9 w-full bg-base-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContestCardSkeleton;
