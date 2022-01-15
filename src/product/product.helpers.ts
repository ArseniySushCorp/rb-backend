import { uniq } from "ramda"

export const extract = <T extends Record<string, string>>(arr: T[], prop: string): string[] =>
  uniq(arr.reduce((acc, item) => [...acc, ...item[prop].split(",")], []))
