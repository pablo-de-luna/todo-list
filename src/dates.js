"use strict"

import { format, addDays } from "date-fns";

const currentDate = format(new Date(), "yyyy-MM-dd");

// today date plus random number of days (between 2 and 7) for example todos
const getRandomUpcomingDate = () => {
  const getRandomInt = () => Math.floor(Math.random() * 6 + 2);

  return format(addDays(currentDate, getRandomInt()), "yyyy-MM-dd");
};

// TODO make functions to get dates formated as "Today", "Tomorrow"...

export { currentDate, getRandomUpcomingDate };