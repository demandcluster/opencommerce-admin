import {DateTime} from "luxon";

export default function timeAgo(date: string) {
  if (!date) return "";
  const startAt = DateTime.fromMillis(+date);
  const duration = DateTime.now().diff(startAt);
  const durationHours = duration.as("hours");

  let timeAgo = startAt.toFormat("f");

  if (durationHours < 1) {
    timeAgo = startAt.toRelative({unit: "minutes"})
      || `${duration.minutes} minutes ago`;
  }

  if (durationHours > 1 && durationHours < 8) {
    timeAgo = startAt.toRelative({unit: "hours"})
      || `${duration.hours} hours ago`;
  }

  return timeAgo;
}
