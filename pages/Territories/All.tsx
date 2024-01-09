import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../auth/authContext";
import ProtectedRoute from "../Account/protectedRoute";

interface Territory {
  id: string;
  name: string;
  parent: string | null;
  children?: Territory[];
}

function TerritoriesAll() {
  const [message, setMessage] = useState("");
  const [territories, setTerritories] = useState<Territory[]>([]);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  function arrangeTerritories(flatList: Territory[]) {
    const map = new Map();
    const tree: Territory[] = [];

    flatList.forEach((item) => {
      map.set(item.id, { ...item, children: [] });
    });

    map.forEach((item) => {
      if (item.parent && map.has(item.parent)) {
        map.get(item.parent).children.push(item);
      } else {
        tree.push(item);
      }
    });

    return tree;
  }

  async function fetchData() {
    try {
      const response = await fetch("/api/territories");
      const data = await response.json();
      const flatList: Territory[] = data.data;
      const hierarchicalData = arrangeTerritories(flatList);
      setTerritories(hierarchicalData);
      setMessage("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to fetch data");
    }
  }
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/Account/SignIn");
    } else {
      fetchData();
    }
  }, [isLoggedIn, router]);

  const renderTerritories = (territories: Territory[]) => {
    const orderedTerritories = territories.slice().sort((a, b) => {
      const orderedNames = ["Central Luzon", "Metro Manila", "CALABARZON"];
      return orderedNames.indexOf(a.name) - orderedNames.indexOf(b.name);
    });

    return (
      <div>
        <h1 className="text-center text-4xl pt-1 font-bold text-slate-500">
          Territories
        </h1>
        <ul className="tree">
          {orderedTerritories.map((territory) => (
            <li key={territory.id}>
              <span className="nodeMain">{territory.name}</span>
              {territory.children && territory.children.length > 0 && (
                <ul className="sub-tree">
                  {territory.children.map((childTerritory) => (
                    <li key={childTerritory.id}>
                      <span className="nodeChild">{childTerritory.name}</span>
                      {childTerritory.children &&
                        childTerritory.children.length > 0 && (
                          <ul className="sub-tree">
                            {childTerritory.children.map(
                              (subChildTerritory) => (
                                <li key={subChildTerritory.id}>
                                  <span className="nodeGrandChild">
                                    {subChildTerritory.name}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
      <div>
        {renderTerritories(territories)}
      </div>
  );
}

export default ProtectedRoute(TerritoriesAll);
