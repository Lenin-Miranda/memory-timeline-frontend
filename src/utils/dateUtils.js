export const formatDate = (date, format = "MMM DD, YYYY") => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  const options = {
    year: "numeric",
    month: format.includes("MMM") ? "short" : "numeric",
    day: "numeric",
  };

  if (format.includes("MMMM")) {
    options.month = "long";
  }

  return dateObj.toLocaleDateString("en-US", options);
};

export const formatDateForInput = (date) => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toISOString().split("T")[0];
};

export const getRelativeTime = (date) => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;

  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

export const sortByDate = (items, key = "date", direction = "desc") => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);

    if (direction === "desc") {
      return dateB - dateA;
    }
    return dateA - dateB;
  });
};

export const groupByMonth = (items, dateKey = "date") => {
  const groups = {};

  items.forEach((item) => {
    const date = new Date(item[dateKey]);
    if (isNaN(date.getTime())) return;

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}`;

    if (!groups[monthKey]) {
      groups[monthKey] = {
        label: formatDate(date, "MMMM YYYY"),
        items: [],
      };
    }

    groups[monthKey].items.push(item);
  });

  return Object.values(groups).sort((a, b) => {
    const [yearA, monthA] = a.label.split(" ");
    const [yearB, monthB] = b.label.split(" ");

    if (yearA !== yearB) {
      return parseInt(yearB) - parseInt(yearA);
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames.indexOf(monthB) - monthNames.indexOf(monthA);
  });
};
