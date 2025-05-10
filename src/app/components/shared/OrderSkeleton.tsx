// components/skeletons/OrderSkeleton.tsx
export default function OrderSkeleton() {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
  
        <div className="space-y-2 bg-white p-4 rounded shadow">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between py-2 border-b">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          ))}
          <div className="flex justify-between pt-4 font-semibold">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/6"></div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
  
        <div className="h-24 bg-gray-200 rounded"></div>
  
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }
  