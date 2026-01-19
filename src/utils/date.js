import { format, parseISO } from "date-fns";

export const dateFormat = (date) => {
  if (!date) {
    return null;
  }
  return format(parseISO(date), "dd-MM-yyyy");
};

export const formatDateToISO = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d)) return ""; // invalid date
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
