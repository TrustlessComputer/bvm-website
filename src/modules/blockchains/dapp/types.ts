export type FieldOption =
  | {
      inBaseField: true;
      inBlockField: false;
      inSingleField: false;
      index: undefined;
      level: number;
      blockKey: string;
    }
  | {
      inBaseField: false;
      inBlockField: true;
      inSingleField: false;
      index: number;
      level: number;
      blockKey: string;
    }
  | {
      inBaseField: false;
      inBlockField: false;
      inSingleField: true;
      index: number;
      level: number;
      blockKey: string;
    };
