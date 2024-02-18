type PrimitiveType = number | string | boolean;

export type TJSON = {
  [Key: string]: PrimitiveType | Array<PrimitiveType | TJSON> | TJSON;
};
