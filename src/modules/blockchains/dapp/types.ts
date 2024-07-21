export type FieldOption =
  | {
      inBaseField: true;
      inBlockField: false;
      inSingleField: false;
      index: undefined;
    }
  | {
      inBaseField: false;
      inBlockField: true;
      inSingleField: false;
      index: number;
    }
  | {
      inBaseField: false;
      inBlockField: false;
      inSingleField: true;
      index: number;
    };
