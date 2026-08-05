import { PiClockCounterClockwise } from "react-icons/pi";
import { motion } from "motion/react";

import EmptyState from "../ui/EmptyState";
import ActivityItem from "./ActivityItem";

import { staggerContainer } from "../../utils/motion";

function ActivityList({ activities, projectMap, taskMap }) {
  if (activities.length === 0) {
    return (
      <EmptyState
        icon={PiClockCounterClockwise}
        title="No activity yet"
        description="Recent project and task updates will appear here."
      />
    );
  }

  return (
    <motion.ul variants={staggerContainer} initial="hidden" animate="visible">
      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          project={projectMap.get(activity.projectId)}
          task={taskMap.get(activity.taskId)}
          isLast={index === activities.length - 1}
        />
      ))}
    </motion.ul>
  );
}

export default ActivityList;
