export default function SearchInput() {
    return (
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Пошук..."
          className="w-full pl-10 pr-4 py-1.5 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-sm"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="gray"
          className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>
    );
  }
  