import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import Card from "../ui/Card";

const chartColors = [
  "var(--color-muted-foreground)",
  "var(--color-primary)",
  "var(--color-success)",
];

function TaskDistributionChart({ data, total }) {
  return (
    <Card className="p-5">
      <div>
        <h2 className="text-base font-semibold">Task Distribution</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Current task status breakdown.
        </p>
      </div>

      <div className="relative mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                color: "var(--color-foreground)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{total}</span>

          <span className="text-xs text-muted-foreground">Total Tasks</span>
        </div>
      </div>

      <div className="mt-2 grid gap-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: chartColors[index % chartColors.length],
                }}
                aria-hidden="true"
              />

              <span className="text-muted-foreground">{item.name}</span>
            </div>

            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default TaskDistributionChart;
