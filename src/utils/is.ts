import lodash from 'lodash'

export function isFunction(f: unknown) {
  return lodash.isFunction(f)
}

export function isPlainObject(o: unknown) {
  return lodash.isPlainObject(o)
}

export function isUndefined(o: unknown) {
  return lodash.isUndefined(o)
}
