export type ImageUrl = {
  small: string;
  regular: string;
};

export type Images = {
  alt_description: string;
  urls: ImageUrl;
  likes: number;
  user: { name: string };
  id?: number;
};
