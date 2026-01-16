import { format, parseISO } from "date-fns";

export const dateFormat = (date) => {
  if (!date) {
    return null;
  }
  return format(parseISO(date), "dd-MM-yyyy");
};
