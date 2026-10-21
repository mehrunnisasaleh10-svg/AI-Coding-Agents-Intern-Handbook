/**
 * Return tasks matching the selected status.
 * "All" preserves the original behavior and returns every task.
 */
export function filterTasks(tasks, selectedStatus) {
  if (selectedStatus === "All") return tasks;

  return tasks.filter(
    (task) =>
      typeof task.status === "string" &&
      task.status.toLowerCase() === String(selectedStatus).toLowerCase()
  );
}
