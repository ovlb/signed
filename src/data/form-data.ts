export type Punctuation = {
  sign: ',' | '?' | '‽';
  value: string;
};

export const punctuation: Punctuation[] = [
  { value: 'Neutral', sign: ',' },
  { value: 'Chaotic', sign: '?' },
  { value: 'Confused', sign: '‽' },
];