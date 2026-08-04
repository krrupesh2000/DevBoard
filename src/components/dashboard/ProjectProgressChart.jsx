import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "../ui/Card";

function ProjectProgressChart({ projects }) {
  const chartData = projects.map((project) => ({
    name: project.name,
    progress: project.progress,
  }));

  return (
    <Card className="p-5">
      <div>
        <h2 className="text-base font-semibold">Project Progress</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Current completion across your projects.
        </p>
      </div>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 0,
              right: 12,
              bottom: 0,
              left: 12,
            }}
          >
            <CartesianGrid stroke="var(--color-border)" horizontal={false} />

            <XAxis
              type="number"
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "var(--color-muted-foreground)",
                fontSize: 12,
              }}
              tickFormatter={(value) => `${value}%`}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={110}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "var(--color-muted-foreground)",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "var(--color-muted)",
              }}
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                color: "var(--color-foreground)",
              }}
              formatter={(value) => [`${value}%`, "Progress"]}
            />

            <Bar
              dataKey="progress"
              fill="var(--color-primary)"
              radius={[0, 6, 6, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default ProjectProgressChart;
