// components/skeletons/ProfileSkeleton.tsx
export default function ProfileSkeleton() {
    return (
      <div className="bg-yellow-50 py-12 px-4 md:px-10 min-h-screen animate-pulse">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6">
          <div className="h-8 w-40 bg-gray-200 rounded-lg"></div>
  
          <div className="space-y-3">
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-lg" />
          </div>
  
          <div className="space-y-3">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-lg" />
          </div>
  
          <div className="h-12 w-[200px] bg-gray-300 rounded-full mt-6" />
        </div>
      </div>
    );
  }
  