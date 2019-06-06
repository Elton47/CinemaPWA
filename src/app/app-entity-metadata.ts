import { EntityMetadataMap, PropsFilterFnFactory } from '@ngrx/data';
import { Category } from './home/categories/models/category.model';

export const appEntityMetadata: EntityMetadataMap = {
  Category: {
    selectId: (category: Category) => category._id,
    filterFn: nameFilter,
    sortComparer: sortByName
  }
};

export const pluralNames = {
  Category: 'Categories'
};

export function nameFilter<T extends { name: string }>(entities: T[], pattern: string) {
  return PropsFilterFnFactory<T>(['name'])(entities, pattern);
}

export function sortByName(a: { name: string}, b: { name: string}): number {
  return a.name.localeCompare(b.name);
}