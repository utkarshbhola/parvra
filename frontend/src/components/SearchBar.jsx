export default function SearchBar() {
  return (
    <form className="w-full max-w-md">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19 19-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="search"
          id="search"
          placeholder="Search..."
          className="block w-full rounded-full bg-gray-800 text-gray-200 placeholder-gray-400 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-gray-700 transition-all"
        />
      </div>
    </form>
  );
}
