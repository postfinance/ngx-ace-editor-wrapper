import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'

import { AceEditorModule } from '@postfinance/ngx-ace-editor-wrapper'
import { AceEditorDirectiveComponent } from './ace-editor-directive/ace-editor-directive.component'
import { AceEditorComponentComponent } from './ace-editor-component/ace-editor-component.component'

@NgModule({
  declarations: [
    AppComponent,
    AceEditorDirectiveComponent,
    AceEditorComponentComponent,
  ],
  imports: [BrowserModule, AceEditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
