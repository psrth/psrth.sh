"use client";

import GitHubCalendar from "react-github-calendar";

export default function GitHubCalendarCard() {
  const customTheme = {
    light: ["#F6F6F6", "#E2F3DD", "#A5E2BB", "#6DB687", "#5ECD86"],
  };
  interface Activity {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  }

  const selectLastHalfYear = (contributions: Array<Activity>) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setMonth(today.getMonth() - 8);

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      return date >= startDate;
    });
  };

  return (
    <div className="mt-10 github-calendar overflow-hidden">
      <GitHubCalendar
        username="psrth"
        blockSize={16}
        hideColorLegend
        hideMonthLabels
        transformData={selectLastHalfYear}
        hideTotalCount
        colorScheme="light"
        theme={customTheme}
      />
    </div>
  );
}
