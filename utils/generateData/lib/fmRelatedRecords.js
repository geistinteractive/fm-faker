export default function fmRelatedRecords(value, schema, s) {
  const { table, min, max, fk } = value[0];
  return `${min}-${max} ${table}s`;
}
