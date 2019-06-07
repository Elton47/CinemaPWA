import { Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator, HttpResourceUrls, normalizeRoot, Pluralizer } from '@ngrx/data';

@Injectable()
export class AppEntityHttpUrlGenerator extends DefaultHttpUrlGenerator {
  constructor(private _pluralizer: Pluralizer) {
    super(_pluralizer);
  }

  /**
   * Custom URL Generator (uses plural version of entity name as api url)
   * Get or generate the entity and collection resource URLs for the given entity type name
   * @param entityName {string} Name of the entity type, e.g, 'Hero'
   * @param root {string} Root path to the resource, e.g., 'some-api`
   */
  protected getResourceUrls(
    entityName: string,
    root: string
  ): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (!resourceUrls) {
      const nRoot = normalizeRoot(root);
      resourceUrls = {
        entityResourceUrl: `${nRoot}/${this._pluralizer.pluralize(entityName)}/`.toLowerCase(),
        collectionResourceUrl: `${nRoot}/${this._pluralizer.pluralize(entityName)}/`.toLowerCase()
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}