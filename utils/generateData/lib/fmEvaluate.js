export default function fmEvaluate(value, schema) {
  const expression = value.expression;
  return "fmexp:" + expression;
}
