import { Leaf, Heart, Award, Calendar, ChevronRight } from "lucide-react";

export default function TreeProfile() {
  const trees = [1, 2, 3, 4, 5];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left Column */}
      <div className="lg:col-span-1">
        {/* Profile Section */}
        <div className="border-2 p-6 text-center">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-100 mb-4">
              <div className="absolute inset-0 bg-green-50 flex items-center justify-center">
                <Leaf className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">FlowerPower</h2>
            <p className="text-gray-500 mb-4">Tree Enthusiast</p>

            <div className="grid grid-cols-3 gap-4 w-full mb-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-600">25</span>
                <span className="text-xs text-gray-500">Trees</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-600">142</span>
                <span className="text-xs text-gray-500">CO₂ kg</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-600">8</span>
                <span className="text-xs text-gray-500">Badges</span>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex justify-center items-center">
              <Leaf className="mr-2 h-4 w-4" />
              Plant a Tree
            </button>
          </div>
        </div>

        {/* Badge Section */}
        <div className="border-2 p-6 mt-6">
          <h3 className="text-lg font-bold mb-4">Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Badge 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-green-100 p-3 mb-2">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs">Tree Pioneer</span>
            </div>
            {/* Badge 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-green-100 p-3 mb-2">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs">Nature Lover</span>
            </div>
            {/* Badge 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-green-100 p-3 mb-2">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs">1 Year Active</span>
            </div>
            {/* Badge 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-2">
                <Award className="h-6 w-6 text-gray-400" />
              </div>
              <span className="text-xs">Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2">
        <div className="border-2 p-6">
          <h3 className="text-xl font-bold mb-4">My Trees</h3>
          <div className="space-y-4">
            {trees.map((i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-4">
                {/* Tree Icon */}
                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className={`h-8 w-8 ${i % 2 === 0 ? "text-green-800" : "text-green-600"}`} />
                  </div>
                </div>

                {/* Tree Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate">
                      {i % 2 === 0 ? "Pine" : "Oak"} #{i}
                    </h4>
                    <span className="text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded border border-green-200">
                      {i % 2 === 0 ? "Pine" : "Oak"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Planted on May {i + 1}, 2025</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 text-green-600 fill-green-600 mr-1" />
                      {i * 3 + 5}
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span>Location: {i % 2 === 0 ? "Central Park" : "Riverside"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full flex items-center justify-between text-green-600 text-sm hover:underline">
            View all trees
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
