export const safeTitle = ({title, city}) => {
  return title != "" && title != undefined && title != "Untitled" ? title : city;
}

export const fullAddress = ({title, address, city, state, country}) => {
  return  `${title ? title+", " : ""}${address ? address+", " : ""}${city}, ${state}, ${country}`;
}
