const weekDays = [
  "Nedelja",
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
  "Subota",
];

const months = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Jun",
  "Jul",
  "Avgust",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
];

const getDate = (num) => {
  const day = new Date(new Date().setDate(new Date().getDate() + num));

  const weekDay = weekDays[day.getDay()];
  const date = day.getDate();
  const month = months[day.getMonth()];

  return {
    weekDay,
    date,
    month,
    string: `${weekDay}, ${date}. ${month}`,
  };
};

export const getBackendDate = (num) =>
  new Date(new Date().setDate(new Date().getDate() + num)).toDateString();

export default getDate;
