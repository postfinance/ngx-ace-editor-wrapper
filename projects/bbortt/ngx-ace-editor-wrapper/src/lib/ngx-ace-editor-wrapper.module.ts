import {NgModule} from '@angular/core';
import {AceEditorComponent} from './ngx-ace-editor-wrapper.component';
import {AceEditorDirective} from './ngx-ace-editor-wrapper.directive';

const list = [
  AceEditorComponent,
  AceEditorDirective
];

@NgModule({
  declarations: [
    ...list
  ],
  imports: [],
  providers: [],
  exports: list
})
export class AceEditorModule {

}
