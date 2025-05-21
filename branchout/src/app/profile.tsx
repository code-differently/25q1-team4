"use client"; 

import { Award, Calendar, ChevronRight, Pencil, Check } from "lucide-react";
import { GiTreeBranch } from "react-icons/gi";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { JSX, useState } from "react";

export default function ProfilePage(): JSX.Element {
  const [username, setUsername] = useState("FlowerPower");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
 
  return (
    <div className="p-6">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="border-2 rounded-lg bg-white">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-100 mb-4">
                  <div className="absolute inset-0 bg-green-50 flex items-center justify-center">
                    <GiTreeBranch className="h-12 w-12 text-green-600" />
                  </div>
                </div>

                {/* Editable username input with @ prefix */}
                {!isEditing ? (
                  <div className="flex items-center gap-2 justify-center w-full mb-2">
                    <span className="text-2xl font-bold">@{username}</span>
                    <button
                      onClick={() => setIsEditing(true)}
                      aria-label="Edit username"
                      className="text-green-600 hover:text-green-800"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full mb-2">
                    <span className="text-2xl font-bold">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-2xl font-bold border rounded-md px-2 py-1 flex-grow"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsEditing(false)}
                      aria-label="Save username"
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-center w-full mb-6">
                <div className="grid grid-cols-2 gap-4 place-items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-600">6</span>
                    <span className="text-xs text-gray-500">Trees</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-600">3</span>
                    <span className="text-xs text-gray-500">Badges</span>
                  </div>
                </div>
              </div>

              <Link href="/plant-tree" className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                <GiTreeBranch className="mr-2" />
                <span>Plant a Tree</span>
              </Link>
            </div>
          </div>

          <div className="border-2 rounded-lg bg-white mt-6">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Badges</h3>
              <div className="grid grid-cols-2 gap-4">
                <Badge icon={<Award className="h-6 w-6 text-green-600" />} label="Tree Pioneer" />
                <Badge icon={<Award className="h-6 w-6 text-green-600" />} label="Nature Lover" />
                <Badge icon={<Calendar className="h-6 w-6 text-green-600" />} label="1 Year Active" />
                <Badge icon={<Award className="h-6 w-6 text-gray-400" />} label="Locked" muted />
              </div>
            </div>
          </div>
        </div>

        {/* My Trees */}
        <div className="lg:col-span-2">
          <div className="border-2 rounded-lg bg-white">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">My Trees</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-4 border-b pb-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Leaf className={`h-8 w-8 ${i % 2 === 0 ? "text-green-800" : "text-green-600"}`} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{i % 2 === 0 ? "Pine" : "Oak"} #{i}</h4>
                        <span className="ml-2 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                          {i % 2 === 0 ? "Pine" : "Oak"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Planted on May {i + 1}, 2025</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          Location: {i % 2 === 0 ? "Brandywine Park" : "Riverfront"}
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
    </div>
  );
}

function Badge({ icon, label, muted = false }: { icon: JSX.Element; label: string; muted?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`rounded-full ${muted ? "bg-gray-100" : "bg-green-100"} p-3 mb-2`}>{icon}</div>
      <span className="text-xs">{label}</span>
    </div>
  );
}