export function formatearFecha(fechaISO) {
  if (!fechaISO) return "";

  const [añoStr, mesStr, diaStr] = fechaISO.split("-");
  const año = parseInt(añoStr, 10);
  const mes = parseInt(mesStr, 10);
  const dia = parseInt(diaStr, 10);

  // Validar fecha
  const fecha = new Date(año, mes - 1, dia);
  if (isNaN(fecha)) return "";

  const meses = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ];

  return `${String(dia).padStart(2, "0")} ${meses[fecha.getMonth()]}, ${año}`;
}
