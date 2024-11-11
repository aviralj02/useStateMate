export function inferType(value: string): string {
  if (!isNaN(Number(value))) return "number";

  if (value === "true" || value === "false") return "boolean";

  if (value.startsWith("[") && value.endsWith("]")) {
    const elements = value
      .slice(1, -1)
      .split(",")
      .map((el) => el.trim());
    const firstElement = elements[0];

    if (!firstElement) return "any[]";

    if (!isNaN(Number(firstElement))) return "number[]";
    if (firstElement === "true" || firstElement === "false") return "boolean[]";
    if (firstElement.startsWith('"') || firstElement.startsWith("'"))
      return "string[]";

    return "any[]";
  }

  return "string";
}

export const stateRegexPatterns: (RegExp | undefined)[] = [
  /const\s*\[\s*([a-zA-Z0-9_$]+)\s*,\s*$/,
  /const\s*\[\s*([a-zA-Z0-9_$]+)\s*,\s*s$/,
  ,
  /const\s*\[\s*([a-zA-Z0-9_$]+)\s*,\s*set$/,
  ,
  /const\s*\[\s*([a-zA-Z0-9_$]+)\s*,\s*set[a-zA-Z]*$/,
  /const\s{0,5}\[\s{0,5}([a-zA-Z0-9_$]+)\s*,\s*$/,
  /const\s{0,5}\[\s{0,5}([a-zA-Z0-9_$]+)\s*,\s*s$/,
  /const\s{0,5}\[\s{0,5}([a-zA-Z0-9_$]+)\s*,\s*set$/,
  /const\s{0,5}\[\s{0,5}([a-zA-Z0-9_$]+)\s*,\s*set[a-zA-Z]*$/,
];
