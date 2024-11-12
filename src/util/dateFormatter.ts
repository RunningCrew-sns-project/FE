import { format } from "date-fns";

export  const dateFormatter = (selectDate) => {
  console.log(selectDate)
  const date = format(selectDate, "yyyy-MM-dd")
  const time = format(selectDate, "HH:mm:ss");

  console.log(typeof(date), time)

  return {
    date: date,
    startTime: time
  };

}