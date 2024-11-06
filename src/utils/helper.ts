const typeMap: Record<string, string> = {
  string: '""',
  number: "0",
  boolean: "false",
  array: "[]",
  object: "{}",
};

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
