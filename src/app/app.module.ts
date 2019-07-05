import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreatePostComponent } from './protected/create-post/create-post.component';
import { UpdatePostComponent } from './protected/update-post/update-post.component';
import { DeletePostComponent } from './protected/delete-post/delete-post.component';
import { ListPostComponent } from './protected/list-post/list-post.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './interceptors/interceptor.service';
import { HeaderComponent } from './protected/header/header.component';
import { ProtectedComponent } from './protected/protected.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CreatePostComponent,
    UpdatePostComponent,
    DeletePostComponent,
    ListPostComponent,
    HeaderComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    CreatePostComponent,
    UpdatePostComponent,
    DeletePostComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
