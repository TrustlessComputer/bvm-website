export type BaseFieldOption = {
  level: number;
  blockKey: string;
  baseIndex: number;
};

export type FieldOption =
  | ({
      inBaseField: true;
      inBlockField: false;
      inSingleField: false;
      index: undefined;
    } & BaseFieldOption)
  | ({
      inBaseField: false;
      inBlockField: true;
      inSingleField: false;
      index: number;
    } & BaseFieldOption)
  | ({
      inBaseField: false;
      inBlockField: false;
      inSingleField: true;
      index: number;
    } & BaseFieldOption);
