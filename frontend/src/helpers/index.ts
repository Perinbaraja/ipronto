export function formatDateTime(dateString: string, options = { includeComma: false }) {
  const date = new Date(dateString);

  const month = date.toLocaleString("en-US", { month: "short" }); // "Nov"
  const day = date.getDate(); // 11
  const year = date.getFullYear(); // 2025
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  if (options.includeComma) {
    // For "Nov 11, 2025, 11:00 AM"
    return `${month} ${day}, ${year}, ${time}`;
  } else {
    // For "Nov 11 2025 11:00 AM"
    return `${month} ${day} ${year} ${time}`;
  }
}
