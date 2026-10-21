export function filterTasks(tasks, selectedStatus) {
  if (selectedStatus.toLowerCase() === "all") return tasks;
  return tasks.filter((task) =>
    task.status.toLowerCase() === selectedStatus.toLowerCase()
  );
}
