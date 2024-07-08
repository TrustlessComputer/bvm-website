type Json = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: Json };
type JsonArray = Json[];

function isObject(value: any): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function transformObject(obj: Json): any {
  if (isObject(obj)) {
    if (obj.hasOwnProperty('edges') && Array.isArray(obj.edges)) {
      return obj.edges.map((edge) => {
        if (isObject(edge) && edge.hasOwnProperty('node')) {
          return transformObject(edge.node);
        }
        return edge;
      });
    }

    return Object.keys(obj).reduce((result: JsonObject, key) => {
      const value = obj[key];
      result[key] = isObject(value) ? transformObject(value) : value;
      return result;
    }, {});
  }

  if (Array.isArray(obj)) {
    return obj.map(transformObject);
  }

  return obj;
}
