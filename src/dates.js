"use strict"

import { format, addDays, isTomorrow, isPast, isToday } from "date-fns";

export const currentDate = format(new Date(), "yyyy-MM-dd");

// today date plus random number of days (between 2 and 7) for example todos
export const getRandomUpcomingDate = () => {
  const getRandomInt = () => Math.floor(Math.random() * 6 + 2);

  return format(addDays(currentDate, getRandomInt()), "yyyy-MM-dd");
};

export const dateStrToDateInstance = (dateStr) => {
  const dateArr = dateStr.split("-");
  const year = dateArr[0]
  const month = parseInt(dateArr[1]) - 1;
  const day = parseInt(dateArr[2]);

  return new Date(year, month, day);
};

export const formatToRelativeDate = (dateStr) => {
  if (!dateStr) return;

  const date = dateStrToDateInstance(dateStr);

  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isPast(date)) return "Overdue"

  return format(date, "PP");
};
