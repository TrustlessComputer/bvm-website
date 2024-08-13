export type SectionBlockProps = {
  tag: string;
  title: string;
  item: {
    name: string;
    thumbnail: string;
    desc: string;
    tags: string[];
  }[];
};
