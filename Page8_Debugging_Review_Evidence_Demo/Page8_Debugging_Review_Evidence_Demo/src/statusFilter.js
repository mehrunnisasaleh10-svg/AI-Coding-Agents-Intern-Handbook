// Focused fix: compare status values without depending on letter case.
export function filterTasks(tasks, selectedStatus) {
  if (selectedStatus === "All") return tasks;
  return tasks.filter(
    (task) =>
      typeof task.status === "string" &&
      task.status.toLowerCase() === selectedStatus.toLowerCase()
  );
}
