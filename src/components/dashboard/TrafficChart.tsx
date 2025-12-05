import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";

interface TrafficDataPoint {
  time: string;
  vehicles: number;
  avgSpeed: number;
}

interface TrafficChartProps {
  data: TrafficDataPoint[];
  className?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 border border-border/50">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Vehicles:{" "}
            <span className="font-semibold text-primary">
              {payload[0]?.value?.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Avg Speed:{" "}
            <span className="font-semibold text-traffic-clear">
              {payload[1]?.value} mph
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const TrafficChart = ({ data, className }: TrafficChartProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 animate-fade-in opacity-0",
        className
      )}
      style={{ animationDelay: "200ms" }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Traffic Volume
        </h3>
        <p className="text-sm text-muted-foreground">
          Hourly vehicle count and average speed
        </p>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="vehiclesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(168, 84%, 45%)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(168, 84%, 45%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(217, 91%, 60%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(217, 91%, 60%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(217, 33%, 22%)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="vehicles"
              stroke="hsl(168, 84%, 45%)"
              strokeWidth={2}
              fill="url(#vehiclesGradient)"
            />
            <Area
              type="monotone"
              dataKey="avgSpeed"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fill="url(#speedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Vehicle Count</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-xs text-muted-foreground">Avg Speed (mph)</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficChart;
