import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from '../app/auth/auth-interceptor';
import { TimeComponent } from '../app/auth/sesion-information/welcome/time/time.component';
import { WelcomeComponent } from '../app/auth/sesion-information/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetActionsComponent } from './assets/action/action.component';
import { EditComponent } from './assets/edit/edit.component';
import { FilterComponent } from './assets/filter/filter.component';
import { FormComponent } from './assets/form/form.component';
import { ListComponent } from './assets/list/list.component';
import { SearchComponent } from './assets/search/search.component';
import { LoginComponent } from './auth/login/login.component';
import { PasswordComponent } from './auth/login/password/password.component';
import { UsernameComponent } from './auth/login/username/username.component';
import { AuthActionComponent } from './auth/sesion-information/logout/logout.component';
import { SesionInformationComponent } from './auth/sesion-information/sesion-information.component';
import { SnackbarErrorComponent } from './auth/sesion-information/welcome/time/snackbar-error/snackbar-error.component';
import { DenominationComponent } from './denomination/denomination.component';
import { HighlightsDirective } from './directives/highlights.directive';
import { RoleRequiredDirective } from './directives/role-required.directive';
import { FieldComponent } from './field/field.component';
import { HomeComponent } from './home/home.component';
import { LanguagesComponent } from './language/languages.component';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { OptionComponent } from './navigation/option/option.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProgressToolbarComponent } from './progress-toolbar/progress-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DenominationComponent,
    OptionComponent,
    FormComponent,
    ListComponent,
    FieldComponent,
    NavigationComponent,
    AssetActionsComponent,
    EditComponent,
    SearchComponent,
    FilterComponent,
    HighlightsDirective,
    PasswordComponent,
    UsernameComponent,
    AuthActionComponent,
    RoleRequiredDirective,
    LoginComponent,
    LanguagesComponent,
    TimeComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    SesionInformationComponent,
    SnackbarErrorComponent,
    ProgressToolbarComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
    
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
