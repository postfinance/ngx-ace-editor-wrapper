import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import 'brace'
import 'brace/theme/monokai'

declare var ace: any

@Directive({
  selector: '[ace-editor]',
})
export class AceEditorDirective implements OnInit, OnDestroy {
  @Output() textChanged = new EventEmitter()
  @Output() textChange = new EventEmitter()
  editor: any
  oldText: any
  timeoutSaving: any

  constructor(elementRef: ElementRef, private zone: NgZone) {
    let el = elementRef.nativeElement
    this.zone.runOutsideAngular(() => {
      this.editor = ace['edit'](el)
    })
    this.editor.$blockScrolling = Infinity
  }

  _options: any = {}

  @Input() set options(options: any) {
    this._options = options
    this.editor.setOptions(options || {})
  }

  _readOnly: boolean = false

  @Input() set readOnly(readOnly: any) {
    this._readOnly = readOnly
    this.editor.setReadOnly(readOnly)
  }

  _theme: string = 'monokai'

  @Input() set theme(theme: any) {
    this._theme = theme
    this.editor.setTheme(`ace/theme/${theme}`)
  }

  _mode: any = 'html'

  @Input() set mode(mode: any) {
    this.setMode(mode)
  }

  _autoUpdateContent: boolean = true

  @Input() set autoUpdateContent(status: any) {
    this._autoUpdateContent = status
  }

  _durationBeforeCallback: number = 0

  @Input() set durationBeforeCallback(num: number) {
    this.setDurationBeforeCallback(num)
  }

  _text: string = ''

  @Input()
  get text() {
    return this._text
  }

  set text(text: string) {
    this.setText(text)
  }

  get aceEditor() {
    return this.editor
  }

  ngOnInit() {
    this.init()
    this.initEvents()
  }

  ngOnDestroy() {
    this.editor.destroy()
  }

  init() {
    this.editor.setOptions(this._options || {})
    this.editor.setTheme(`ace/theme/${this._theme}`)
    this.setMode(this._mode)
    this.editor.setReadOnly(this._readOnly)
  }

  initEvents() {
    this.editor.on('change', () => this.updateText())
    this.editor.on('paste', () => this.updateText())
  }

  updateText() {
    let newVal = this.editor.getValue()
    if (newVal === this.oldText) {
      return
    }
    if (!this._durationBeforeCallback) {
      this._text = newVal
      this.zone.run(() => {
        this.textChange.emit(newVal)
        this.textChanged.emit(newVal)
      })
    } else {
      if (this.timeoutSaving != null) {
        clearTimeout(this.timeoutSaving)
      }

      this.timeoutSaving = setTimeout(() => {
        this._text = newVal
        this.zone.run(() => {
          this.textChange.emit(newVal)
          this.textChanged.emit(newVal)
        })
        this.timeoutSaving = null
      }, this._durationBeforeCallback)
    }
    this.oldText = newVal
  }

  setMode(mode: any) {
    this._mode = mode
    if (typeof this._mode === 'object') {
      this.editor.getSession().setMode(this._mode)
    } else {
      this.editor.getSession().setMode(`ace/mode/${this._mode}`)
    }
  }

  setText(text: any) {
    if (this._text !== text) {
      if (text === null || text === undefined) {
        text = ''
      }

      if (this._autoUpdateContent === true) {
        this._text = text
        this.editor.setValue(text)
        this.editor.clearSelection()
      }
    }
  }

  setDurationBeforeCallback(num: number) {
    this._durationBeforeCallback = num
  }
}
