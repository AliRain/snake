export function createEmptyArray(length: number): any[] {
  return Array(length).fill(undefined);
}

export function containsTuple<T>(array: [T, T][], tuple: [T, T]) {
  for (const item of array) if (item[0] === tuple[0] && item[1] === tuple[1]) return true;

  return false;
}

export function areEqualTuples<T>(a: [T, T], b: [T, T]): boolean {
  return a[0] === b[0] && a[1] === b[1];
}
