type Json =
  | { [key: string]: Json }
  | Json[]
  | string
  | number
  | boolean
  | null;

type JsonObj = { [key: string]: Json };

export function transformObject(obj: Json): Json {
  if (isObject(obj)) {
    if (obj.edges && Array.isArray(obj.edges)) {
      return obj.edges.map((edge) => {
        if (edge && isObject(edge)) {
          return transformObject(edge.node);
        }

        return edge;
      });
    }

    return Object.keys(obj).reduce((result: JsonObj, key) => {
      const value = obj[key];
      result[key] = isObject(value) ? transformObject(value) : obj[key];
      return result;
    }, {} as JsonObj);
  }

  if (Array.isArray(obj)) {
    return obj.map(transformObject);
  }

  return obj;
}

function isObject(input: Json): input is JsonObj {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}
