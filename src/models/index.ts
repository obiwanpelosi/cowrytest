export type Image = {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    location: string;
  };
};
export type SearchImageResponse = {
  total: number;
  total_pages: number;
  results: Image[];
};
