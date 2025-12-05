export const trafficMetrics = {
  totalVehicles: 24847,
  averageSpeed: 42,
  congestionLevel: 67,
  activeSensors: 156,
};

export const hourlyTrafficData = [
  { time: "6AM", vehicles: 1200, avgSpeed: 55 },
  { time: "7AM", vehicles: 2800, avgSpeed: 45 },
  { time: "8AM", vehicles: 4500, avgSpeed: 32 },
  { time: "9AM", vehicles: 3800, avgSpeed: 38 },
  { time: "10AM", vehicles: 2600, avgSpeed: 48 },
  { time: "11AM", vehicles: 2200, avgSpeed: 52 },
  { time: "12PM", vehicles: 2800, avgSpeed: 45 },
  { time: "1PM", vehicles: 3200, avgSpeed: 42 },
  { time: "2PM", vehicles: 2900, avgSpeed: 46 },
  { time: "3PM", vehicles: 3400, avgSpeed: 40 },
  { time: "4PM", vehicles: 4200, avgSpeed: 35 },
  { time: "5PM", vehicles: 4800, avgSpeed: 28 },
  { time: "6PM", vehicles: 4100, avgSpeed: 33 },
  { time: "7PM", vehicles: 3200, avgSpeed: 44 },
  { time: "8PM", vehicles: 2400, avgSpeed: 52 },
];

export const trafficHotspots = [
  {
    id: 1,
    name: "Downtown Core",
    lat: 37.7849,
    lng: -122.4094,
    status: "heavy" as const,
    vehicles: 3420,
  },
  {
    id: 2,
    name: "Bay Bridge",
    lat: 37.7983,
    lng: -122.3778,
    status: "moderate" as const,
    vehicles: 2180,
  },
  {
    id: 3,
    name: "Golden Gate",
    lat: 37.8199,
    lng: -122.4783,
    status: "clear" as const,
    vehicles: 1240,
  },
  {
    id: 4,
    name: "Mission District",
    lat: 37.7599,
    lng: -122.4148,
    status: "moderate" as const,
    vehicles: 1890,
  },
  {
    id: 5,
    name: "SoMa",
    lat: 37.7785,
    lng: -122.3950,
    status: "heavy" as const,
    vehicles: 2760,
  },
];
