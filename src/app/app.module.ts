import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BsModule } from './modules/bs/bs.module';
import { MaterialModule } from './modules/material/material.module';
import { SidenavBtnComponent } from './components/sidenav-btn/sidenav-btn.component';
import { DataComponent } from './components/data/data.component';
import { FileComponent } from './components/file/file.component';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { EditorComponent } from './components/editor/editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { StartComponent } from './components/start/start.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CreateFileComponent } from './components/create-file/create-file.component';
import { SearchFileComponent } from './components/search-file/search-file.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ToolbarComponent,
    SidenavBtnComponent,
    DataComponent,
    FileComponent,
    EditorComponent,
    StartComponent,
    CreateFileComponent,
    SearchFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsModule,
    MaterialModule,
    SweetAlert2Module.forRoot(),
    AngularMarkdownEditorModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
