export interface FavoriteMovie {
  _id: string;
  name?: string;
  origin_name?: string;
  poster_url?: string;
  episode_current?: string;
  slug?: string;
  category?: string[];
  country?: string[];
  year?: string;
  addedAt?: Date;
}
