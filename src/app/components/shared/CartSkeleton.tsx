export default function CartSkeleton() {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md">
              <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  