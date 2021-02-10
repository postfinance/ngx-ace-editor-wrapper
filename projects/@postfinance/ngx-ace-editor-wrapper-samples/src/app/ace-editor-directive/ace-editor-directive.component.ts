import { Component } from '@angular/core'

import * as editorContent from '../../assets/editor-content.json'

import 'brace'
import 'brace/mode/json'
import 'brace/theme/terminal'

@Component({
  selector: 'app-ace-editor-directive',
  templateUrl: './ace-editor-directive.component.html',
  styleUrls: ['./ace-editor-directive.component.css'],
})
export class AceEditorDirectiveComponent {
  aceEditorText = JSON.stringify(editorContent, null, 2)
}
