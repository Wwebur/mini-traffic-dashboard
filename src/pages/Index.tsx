import { Car, Gauge, Activity, Radio } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import TrafficChart from "@/components/dashboard/TrafficChart";
import TrafficMap from "@/components/dashboard/TrafficMap";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import {
  trafficMetrics,
  hourlyTrafficData,
  trafficHotspots,
} from "@/data/mockData";

const Index = () => {
  const getCongestionStatus = (level: number) => {
    if (level < 40) return "clear";
    if (level < 70) return "moderate";
    return "heavy";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="animate-fade-in opacity-0">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Traffic Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time traffic monitoring • San Francisco
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Metrics Row */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Vehicles"
            value={trafficMetrics.totalVehicles.toLocaleString()}
            subtitle="Last 24 hours"
            icon={<Car className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
            delay={0}
          />
          <MetricCard
            title="Average Speed"
            value={`${trafficMetrics.averageSpeed} mph`}
            subtitle="Current average"
            icon={<Gauge className="h-5 w-5" />}
            trend={{ value: 5, isPositive: false }}
            delay={50}
          />
          <MetricCard
            title="Congestion Level"
            value={`${trafficMetrics.congestionLevel}%`}
            subtitle="Network utilization"
            icon={<Activity className="h-5 w-5" />}
            status={getCongestionStatus(trafficMetrics.congestionLevel)}
            delay={100}
          />
          <MetricCard
            title="Active Sensors"
            value={trafficMetrics.activeSensors}
            subtitle="Online monitoring"
            icon={<Radio className="h-5 w-5" />}
            trend={{ value: 3, isPositive: true }}
            delay={150}
          />
        </div>

        {/* Chart and Map Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TrafficChart data={hourlyTrafficData} />
          <TrafficMap hotspots={trafficHotspots} />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Data updates every 30 seconds • Last update: {new Date().toLocaleTimeString()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
