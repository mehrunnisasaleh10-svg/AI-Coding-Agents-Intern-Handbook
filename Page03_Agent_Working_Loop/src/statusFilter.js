export function filterTasks(tasks, selectedStatus) {
  if (selectedStatus === "All") return tasks;

  return tasks.filter(
    (task) => task.status.toLowerCase() === selectedStatus.toLowerCase()
  );
}
