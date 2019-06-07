import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DefaultDataServiceConfig, EntityDataModule, EntityDispatcherDefaultOptions, EntityServices, HttpUrlGenerator } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { environment } from '../environments/environment';
import { AppEntityHttpUrlGenerator } from './app-entity-http-url-generator';
import { entityMetadata, pluralNames } from './app-entity-metadata';
import { AppEntityServices } from './app-entity-services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/layout.module';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
  timeout: 20000,
  delete404OK: false
};

const entityDispatcherDefaultOptions: EntityDispatcherDefaultOptions = {
  optimisticAdd: false,
  optimisticDelete: false,
  optimisticSaveEntities: false,
  optimisticUpdate: false,
  optimisticUpsert: false
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    LoadingBarHttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppLayoutModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EntityDataModule.forRoot({
      entityMetadata,
      pluralNames
    })
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { disableClose: true, hasBackdrop: true }
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: null
    },
    AppEntityServices,
    {
      provide: EntityServices,
      useExisting: AppEntityServices
    },
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    },
    {
      provide: EntityDispatcherDefaultOptions,
      useValue: entityDispatcherDefaultOptions
    },
    {
      provide: HttpUrlGenerator,
      useClass: AppEntityHttpUrlGenerator
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
