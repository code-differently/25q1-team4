import { ChevronRight, MapPin, Award, Heart, Calendar, Share2, Ruler } from "lucide-react";
import { useState } from "react";
import { GiTreeBranch } from "react-icons/gi";

interface Tree {
  id: number;
  x: number;
  y: number;
  type: string;
  date: string;
}

export default function MapView() {
  const [activeTab, setActiveTab] = useState('map')
  const [hoveredTree, setHoveredTree] = useState<number | null>(null);
  const [detailsTab, setDetailsTab] = useState('details');

  // Sample tree data
  const trees: Tree[] = [
    { id: 1, x: 25, y: 30, type: "Oak", date: "01/05/25" },
    { id: 2, x: 45, y: 60, type: "Pine", date: "03/15/25" },
    { id: 3, x: 70, y: 40, type: "Maple", date: "04/20/25" },
    { id: 4, x: 85, y: 75, type: "Oak", date: "05/01/25" },
    { id: 5, x: 15, y: 65, type: "Pine", date: "05/10/25" },
  ];

  // Get color based on tree type
  const getTreeColor = (type: string) => {
    switch (type) {
      case "Oak":
        return "text-green-600"
      case "Pine":
        return "text-green-800"
      case "Maple":
        return "text-green-400"
      default:
        return "text-green-600"
    }
  }

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Custom Tabs */}
        <div className="w-full">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md bg-white p-1 shadow-sm">
              <button
                onClick={() => setActiveTab("map")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "map" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Map View
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "profile" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "details" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Tree Details
              </button>
            </div>
          </div>

          {/* Map View Tab */}
          {activeTab === "map" && (
            <div className="grid gap-8 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2">
                <div className="border-2 rounded-lg overflow-hidden bg-white">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                    {/* Map Component */}
                    <div className="relative w-full h-full bg-gray-50 overflow-hidden">
                      {/* Map background with subtle grid */}
                      <div
                        className="absolute inset-0 bg-white"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                          `,
                          backgroundSize: "20px 20px",
                        }}
                      >
                        {/* Map features - rivers, paths */}
                        <svg width="100%" height="100%" className="absolute inset-0">
                          <path d="M10,50 Q30,40 50,60 T90,50" stroke="#e0f2fe" strokeWidth="8" fill="none" />
                          <path
                            d="M20,20 L40,30 L60,25 L80,40"
                            stroke="#d4d4d8"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            fill="none"
                          />
                        </svg>
                      </div>

                      {/* Tree markers */}
                      {trees.map((tree) => (
                        <div
                          key={tree.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 cursor-pointer"
                          style={{ left: `${tree.x}%`, top: `${tree.y}%` }}
                          onMouseEnter={() => setHoveredTree(tree.id)}
                          onMouseLeave={() => setHoveredTree(null)}
                        >
                          <MapPin
                            className={`${getTreeColor(tree.type)} ${
                              hoveredTree === tree.id ? "h-8 w-8 -mt-1" : "h-6 w-6"
                            }`}
                            fill={hoveredTree === tree.id ? "rgba(22, 163, 74, 0.2)" : "rgba(22, 163, 74, 0.1)"}
                          />

                          {/* Tooltip */}
                          {hoveredTree === tree.id && (
                            <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white shadow-lg rounded-md p-2 text-xs w-32">
                              <div className="font-bold">{tree.type}</div>
                              <div className="text-gray-500">Planted: {tree.date}</div>
                              <div className="text-gray-500">ID: #{tree.id}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Map of Trees</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-600"></div>
                          <span>Oak</span>
                        </div>
                        <span className="text-sm text-gray-500">12 planted</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-800"></div>
                          <span>Pine</span>
                        </div>
                        <span className="text-sm text-gray-500">8 planted</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-400"></div>
                          <span>Maple</span>
                        </div>
                        <span className="text-sm text-gray-500">5 planted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="border-2 rounded-lg bg-white">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 border-b pb-4">
                        <div className="rounded-full bg-green-100 p-2">
                          <GiTreeBranch className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">Oak planted in Central Park</p>
                          <p className="text-sm text-gray-500">May 12, 2025</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 border-b pb-4">
                        <div className="rounded-full bg-green-100 p-2">
                          <GiTreeBranch className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">Pine planted in Riverside</p>
                          <p className="text-sm text-gray-500">May 10, 2025</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-green-100 p-2">
                          <GiTreeBranch className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">Maple planted in Highland Park</p>
                          <p className="text-sm text-gray-500">May 5, 2025</p>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 w-full text-green-600 flex justify-between items-center text-sm font-medium">
                      View all activity
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="border-2 rounded-lg bg-white">
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-100 mb-4">
                        <div className="absolute inset-0 bg-green-50 flex items-center justify-center">
                          <GiTreeBranch className="h-12 w-12 text-green-600" />
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

                      <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                        <GiTreeBranch className="mr-2 h-4 w-4" />
                        Plant a Tree
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-2 rounded-lg bg-white mt-6">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">Badges</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="rounded-full bg-green-100 p-3 mb-2">
                          <Award className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-xs">Tree Pioneer</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="rounded-full bg-green-100 p-3 mb-2">
                          <Heart className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-xs">Nature Lover</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="rounded-full bg-green-100 p-3 mb-2">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-xs">1 Year Active</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="rounded-full bg-gray-100 p-3 mb-2">
                          <Award className="h-6 w-6 text-gray-400" />
                        </div>
                        <span className="text-xs">Locked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="border-2 rounded-lg bg-white">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">My Trees</h3>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 border-b pb-4">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <GiTreeBranch className="h-8 w-8 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium truncate">
                                {i % 2 === 0 ? "Pine" : "Oak"} #{i}
                              </h4>
                              <span className="ml-2 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                                {i % 2 === 0 ? "Pine" : "Oak"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Planted on May {i + 1}, 2025</p>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 text-green-600 fill-green-600 mr-1" />
                                <span className="text-xs text-gray-500">{i * 3 + 5}</span>
                              </div>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-xs text-gray-500">
                                Location: {i % 2 === 0 ? "Central Park" : "Riverside"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 w-full text-green-600 flex justify-between items-center text-sm font-medium">
                      View all trees
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tree Details Tab */}
          {activeTab === "details" && (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="border-2 rounded-lg overflow-hidden bg-white">
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GiTreeBranch className="h-24 w-24 text-green-600 opacity-20" />
                    </div>
                    <span className="absolute top-4 right-4 inline-flex items-center rounded-md bg-green-600 px-2.5 py-0.5 text-xs font-medium text-white">
                      Oak
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">Oak #12</h2>
                      <div className="flex items-center gap-2">
                        <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Planted On</p>
                          <p className="text-sm text-gray-500">May 1, 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-gray-500">Central Park, NY</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Height</p>
                          <p className="text-sm text-gray-500">2.5 meters</p>
                        </div>
                      </div>
                    </div>

                    {/* Custom Tabs for Tree Details */}
                    <div>
                      <div className="flex w-full border-b">
                        <button
                          onClick={() => setDetailsTab("details")}
                          className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                            detailsTab === "details"
                              ? "border-green-600 text-green-600"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setDetailsTab("growth")}
                          className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                            detailsTab === "growth"
                              ? "border-green-600 text-green-600"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          Growth
                        </button>
                        <button
                          onClick={() => setDetailsTab("impact")}
                          className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                            detailsTab === "impact"
                              ? "border-green-600 text-green-600"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          Impact
                        </button>
                      </div>

                      {detailsTab === "details" && (
                        <div className="mt-4 space-y-4">
                          <p className="text-sm text-gray-500">
                            This oak tree was planted as part of the city&apos;s green initiative. Oak trees are known
                            for their strength, longevity, and ability to support diverse ecosystems. This
                            particular specimen is a Quercus alba (White Oak), native to eastern North America.
                          </p>
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Species</span>
                              <span className="text-sm font-medium">Quercus alba (White Oak)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Age</span>
                              <span className="text-sm font-medium">2 years</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Health</span>
                              <span className="text-sm font-medium">Excellent</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Last Check</span>
                              <span className="text-sm font-medium">April 15, 2025</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {detailsTab === "growth" && (
                        <div className="mt-4">
                          <div className="h-[200px] w-full bg-gray-50 rounded-md flex items-center justify-center">
                            <p className="text-gray-400">Growth chart will appear here</p>
                          </div>
                        </div>
                      )}

                      {detailsTab === "impact" && (
                        <div className="mt-4 space-y-4">
                          <p className="text-sm text-gray-500">
                            This oak tree contributes to environmental health in multiple ways:
                          </p>
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">CO₂ Absorbed</span>
                              <span className="text-sm font-medium">5.2 kg per year</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Oxygen Produced</span>
                              <span className="text-sm font-medium">~3.8 kg per year</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Wildlife Support</span>
                              <span className="text-sm font-medium">Habitat for 5+ species</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Lifetime Impact</span>
                              <span className="text-sm font-medium">Growing</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="border-2 rounded-lg bg-white">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">Location</h3>
                    <div className="aspect-square w-full rounded-md overflow-hidden mb-4 bg-gray-100 relative">
                      <div
                        className="absolute inset-0 bg-white"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                          `,
                          backgroundSize: "10px 10px",
                        }}
                      >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <MapPin className="h-8 w-8 text-green-600" fill="rgba(22, 163, 74, 0.2)" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Latitude</span>
                        <span className="text-sm font-medium">40.7829° N</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Longitude</span>
                        <span className="text-sm font-medium">73.9654° W</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Area</span>
                        <span className="text-sm font-medium">Central Park</span>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </button>
                  </div>
                </div>

                <div className="border-2 rounded-lg bg-white mt-6">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">Nearby Trees</h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <GiTreeBranch className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {i === 1 ? "Oak" : i === 2 ? "Pine" : "Maple"} #{i + 10}
                            </p>
                            <p className="text-xs text-gray-500">{i * 50 + 100}m away</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-2 w-full text-green-600 flex justify-between items-center text-sm font-medium p-0">
                      View all nearby
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}