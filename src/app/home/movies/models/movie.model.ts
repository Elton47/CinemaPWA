import { Category } from '../../categories/models/category.model';

export class Movie {
  id: string;
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