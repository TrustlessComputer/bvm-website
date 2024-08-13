import React from 'react';

export type SectionBlockProps = {
  tag: string;
  title: string;
  twitter?: string;
  webpage?: string;
  item: {
    name: string;
    thumbnail: string;
    desc: React.ReactNode;
    tags: string[];
  }[];
};
