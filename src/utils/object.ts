import lodash from 'lodash-es'

export function merge(f: unknown, j) {
  return lodash.merge(f, j)
}

export function cloneDeep(f: unknown) {
  return lodash.cloneDeep(f)
}

export function uniqBy(f: unknown, j) {
  return lodash.uniqBy(f, j)
}
