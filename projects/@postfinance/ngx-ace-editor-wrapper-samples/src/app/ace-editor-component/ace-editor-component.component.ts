import { AfterViewInit, Component, ViewChild } from '@angular/core'

import { AceEditorComponent } from '@postfinance/ngx-ace-editor-wrapper'

import * as editorContent from '../../assets/editor-content.json'

import 'brace'
import 'brace/mode/json'
import 'brace/theme/chrome'

@Component({
  selector: 'app-ace-editor-component',
  templateUrl: './ace-editor-component.component.html',
  styleUrls: ['./ace-editor-component.component.css'],
})
export class AceEditorComponentComponent implements AfterViewInit {
  @ViewChild(AceEditorComponent)
  aceEditorComponent?: AceEditorComponent

  private aceEditorText = JSON.stringify(editorContent, null, 2)

  ngAfterViewInit(): void {
    this.aceEditorComponent.setMode('json')
    this.aceEditorComponent.setText(this.aceEditorText)
    this.aceEditorComponent.setTheme('chrome')
  }
}
