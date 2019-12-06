export default function fmRelated(value, schema) {
  const { field, table } = value;
  return `${table}::${field}`;
}
