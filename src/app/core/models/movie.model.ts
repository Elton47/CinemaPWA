import { Category } from './category.model';

export class Movie {
  id: number;
  name: string;
  director: string;
  description: string;
  duration: string;
  year: number;
  rating: string;
  ratingUrl: string;
  avatarUrl: string;
  thumbnailUrl: string;
  trailerUrl: string;
  category: Category;
}