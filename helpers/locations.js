export const safeTitle = ({title, city}) => {
  return title != "" && title != undefined && title != "Untitled" ? title : city;
}
