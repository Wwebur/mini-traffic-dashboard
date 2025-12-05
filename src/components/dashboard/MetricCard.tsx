import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "clear" | "moderate" | "heavy";
  className?: string;
  delay?: number;
}

const statusColors = {
  clear: "bg-traffic-clear/20 text-traffic-clear border-traffic-clear/30",
  moderate: "bg-warning/20 text-warning border-warning/30",
  heavy: "bg-destructive/20 text-destructive border-destructive/30",
};

const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  status,
  className,
  delay = 0,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/30",
        "animate-fade-in opacity-0",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </span>
            {trend && (
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-traffic-clear" : "text-destructive"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "rounded-lg p-2.5 border",
            status ? statusColors[status] : "bg-primary/10 text-primary border-primary/20"
          )}
        >
          {icon}
        </div>
      </div>
      {status && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 rounded-full animate-pulse",
              status === "clear" && "bg-traffic-clear",
              status === "moderate" && "bg-warning",
              status === "heavy" && "bg-destructive"
            )}
          />
          <span className="text-xs font-medium capitalize text-muted-foreground">
            {status} traffic
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
