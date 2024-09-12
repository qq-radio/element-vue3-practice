import lodash from "lodash-es";

export function merge(f: unknown, j) {
  return lodash.merge(f, j);
}

export function cloneDeep(f) {
  return lodash.cloneDeep(f);
}

export function uniqBy<T>(f: T[], j) {
  return lodash.uniqBy(f, j);
}
