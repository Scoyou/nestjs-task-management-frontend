import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Grid } from "semantic-ui-react";

const DashboardGraphs = ({ tasks }) => {
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <PieChart
            animate={true}
            paddingAngle={5}
            radius={40}
            data={[
              {
                title: "In Progress",
                value: tasks.filter((t) => t.status === "IN_PROGRESS").length,
                color: "#E38627",
              },
              {
                title: "Done",
                value: tasks.filter((t) => t.status === "DONE").length,
                color: "#C13C37",
              },
              {
                title: "Open",
                value: tasks.filter((t) => t.status === "OPEN").length,
                color: "#6A2135",
              },
            ]}
          />
        </Grid.Column>
        <Grid.Column>
          <PieChart
            animate={true}
            radius={40}
            paddingAngle={5}
            data={[
              {
                title: "Maintenence",
                value: tasks.filter((t) => t.priority === "MAINTENANCE").length,
                color: "#48DB57",
              },
              {
                title: "Pressing",
                value: tasks.filter((t) => t.priority === "PRESSING").length,
                color: "#FAE42F",
              },
              {
                title: "Critical",
                value: tasks.filter((t) => t.priority === "CRITICAL").length,
                color: "#FA2A1E",
              },
            ]}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DashboardGraphs;
