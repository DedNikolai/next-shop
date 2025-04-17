// src/components/ProductSkeleton.tsx
export default function ProductCardSkeleton() {
    return (
      <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-10 animate-pulse">
        <div className="w-full md:w-1/2 bg-yellow-100 p-6 rounded-3xl flex items-center justify-center">
          <div className="w-[300px] h-[300px] bg-gray-300 rounded-2xl" />
        </div>
  
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="h-10 bg-gray-300 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-full" />
          <div className="h-6 bg-gray-200 rounded w-5/6" />
          
          <div className="flex gap-4 mt-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          </div>
  
          <div className="h-8 bg-gray-300 rounded w-32 mt-4" />
          <div className="h-12 bg-gray-400 rounded-full mt-4 w-1/2" />
        </div>
      </div>
    );
  }
  