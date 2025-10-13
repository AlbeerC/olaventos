export function formatearFecha(fechaISO) {
  const [año, mes, dia] = fechaISO.split("-");
  const fecha = new Date(año, mes - 1, dia);

  const meses = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ];
  return `${dia} ${meses[fecha.getMonth()]}, ${año}`;
}