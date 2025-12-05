import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/config/mapbox";

interface Hotspot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: "clear" | "moderate" | "heavy";
  vehicles: number;
}

interface TrafficMapProps {
  hotspots: Hotspot[];
  className?: string;
}

const statusColors = {
  clear: "#22c55e",
  moderate: "#f59e0b",
  heavy: "#ef4444",
};

const TrafficMap = ({ hotspots, className }: TrafficMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState("");

  const initializeMap = (token: string) => {
    if (!mapContainer.current) {
      setError("Map container not ready. Please try again.");
      return;
    }
    
    if (!token) {
      setError("Mapbox token is not configured.");
      return;
    }

    try {
      setError("");
      
      // Set the access token
      mapboxgl.accessToken = token;

      // Create the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-122.4194, 37.7749], // San Francisco
        zoom: 11,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      map.current.on("load", () => {
        setIsMapLoaded(true);
        setError("");

        hotspots.forEach((hotspot) => {
          const el = document.createElement("div");
          el.className = "relative w-4 h-4";
          el.innerHTML = `
            <div class="absolute inset-0 rounded-full animate-ping opacity-30" style="background-color: ${statusColors[hotspot.status]}"></div>
            <div class="absolute inset-0 rounded-full border-2 border-white shadow-lg" style="background-color: ${statusColors[hotspot.status]}"></div>
          `;

          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            className: "traffic-popup",
          }).setHTML(`
            <div class="p-2 bg-card rounded-lg">
              <p class="font-semibold text-sm text-foreground">${hotspot.name}</p>
              <p class="text-xs text-muted-foreground">${hotspot.vehicles.toLocaleString()} vehicles</p>
              <p class="text-xs capitalize font-medium" style="color: ${statusColors[hotspot.status]}">${hotspot.status} traffic</p>
            </div>
          `);

          const marker = new mapboxgl.Marker(el)
            .setLngLat([hotspot.lng, hotspot.lat])
            .setPopup(popup)
            .addTo(map.current);

          markers.current.push(marker);
        });
      });

      map.current.on("error", (e) => {
        console.error("Map error:", e);
        const errorEvent = e as { error?: { message?: string } };
        const errorMsg = errorEvent.error?.message || "Failed to load map";
        setError(`Map error: ${errorMsg}. Check your network connection.`);
        setIsMapLoaded(false);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setError(`Initialization failed: ${errorMessage}`);
      setIsMapLoaded(false);
    }
  };

  useEffect(() => {
    if (MAPBOX_TOKEN && !map.current) {
      const timer = setTimeout(() => {
        initializeMap(MAPBOX_TOKEN);
      }, 100);
      
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentMarkers = markers.current;
    const currentMap = map.current;
    
    return () => {
      currentMarkers.forEach((marker) => marker.remove());
      currentMap?.remove();
    };
  }, []);

  return (
    <div
      className={cn(
        "glass-card rounded-xl overflow-hidden animate-fade-in opacity-0",
        className
      )}
      style={{ animationDelay: "300ms" }}
    >
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Traffic Hotspots
            </h3>
            <p className="text-sm text-muted-foreground">
              Real-time congestion monitoring
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div ref={mapContainer} className="h-[350px] w-full" />
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-lg">
            <AlertTriangle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Hotspot Legend */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="flex items-center gap-2 text-xs whitespace-nowrap"
            >
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: statusColors[hotspot.status] }}
              />
              <span className="text-muted-foreground">{hotspot.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
