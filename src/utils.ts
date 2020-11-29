import { curry, is, mapObjIndexed, map } from "ramda";

export const deepMap = curry((mapFn: any, target: object) => {
  if (is(Date, target)) return target;

  if (is(Array, target)) {
    return map(deepMap(mapFn), target);
  }

  if (is(Object, target)) {
    return mapObjIndexed(deepMap(mapFn), target);
  }

  return mapFn(target);
});
