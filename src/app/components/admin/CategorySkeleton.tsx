import React from 'react';

export default function CategorySkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white rounded shadow animate-pulse">
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
