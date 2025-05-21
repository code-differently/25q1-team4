import { Leaf, MapPin, Calendar, Ruler, Heart, Share2, ChevronRight } from "lucide-react"


export default function TreeDetails() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-2">
          <CardContent className="p-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="h-24 w-24 text-green-600 opacity-20" />
              </div>
              <Badge className="absolute top-4 right-4 bg-green-600">Oak</Badge>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Oak #12</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
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

              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="growth" className="flex-1">
                    Growth
                  </TabsTrigger>
                  <TabsTrigger value="impact" className="flex-1">
                    Impact
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4 space-y-4">
                  <p className="text-sm text-gray-500">
                    This oak tree was planted as part of the city's green initiative. Oak trees are known for their
                    strength, longevity, and ability to support diverse ecosystems. This particular specimen is a
                    Quercus alba (White Oak), native to eastern North America.
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
                </TabsContent>
                <TabsContent value="growth" className="mt-4">
                  <div className="h-[200px] w-full bg-gray-50 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">Growth chart will appear here</p>
                  </div>
                </TabsContent>
                <TabsContent value="impact" className="mt-4 space-y-4">
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
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="border-2">
          <CardContent className="p-6">
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
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <MapPin className="mr-2 h-4 w-4" />
              Get Directions
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Nearby Trees</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-green-600" />
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
            <Button variant="link" className="mt-2 w-full justify-between text-green-600 p-0">
              View all nearby
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
