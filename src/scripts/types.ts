export type ControlElements = Record<string, HTMLInputElement>;

export type PossibleElement = HTMLInputElement | HTMLSpanElement | HTMLParagraphElement;

export type TextElement = HTMLSpanElement | HTMLParagraphElement;

export type CamelCase<S extends string> = S extends `${infer P}-${infer Q}${infer R}`
  ? `${P}${Capitalize<Q & string>}${CamelCase<R>}`
  : S;

export type ToCamelCaseKeys<T extends readonly string[]> = {
  [K in T[number]]: CamelCase<K>;
};

export type TypedElements<T extends readonly string[], E> = {
  [K in ToCamelCaseKeys<T>[T[number]]]: E;
};
