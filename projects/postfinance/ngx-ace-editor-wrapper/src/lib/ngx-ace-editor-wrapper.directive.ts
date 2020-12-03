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
  selector: '[ngxAceEditor]',
})
export class AceEditorDirective implements OnInit, OnDestroy {
  @Output() textChanged = new EventEmitter()
  @Output() textChange = new EventEmitter()

  editor: any
  oldText: any
  timeoutSaving: any

  constructor(elementRef: ElementRef, private zone: NgZone) {
    const el = elementRef.nativeElement
    this.zone.runOutsideAngular(() => {
      this.editor = ace.edit(el)
    })
    this.editor.$blockScrolling = Infinity
  }

  // tslint:disable-next-line:variable-name
  private _options: any = {}

  @Input() set options(options: any) {
    this._options = options
    this.editor.setOptions(options || {})
  }

  // tslint:disable-next-line:variable-name
  private _readOnly = false

  @Input() set readOnly(readOnly: any) {
    this._readOnly = readOnly
    this.editor.setReadOnly(readOnly)
  }

  // tslint:disable-next-line:variable-name
  private _theme = 'monokai'

  @Input() set theme(theme: any) {
    this._theme = theme
    this.editor.setTheme(`ace/theme/${theme}`)
  }

  // tslint:disable-next-line:variable-name
  private _mode: any = 'html'

  @Input() set mode(mode: any) {
    this.setMode(mode)
  }

  // tslint:disable-next-line:variable-name
  private _autoUpdateContent = true

  @Input() set autoUpdateContent(status: any) {
    this._autoUpdateContent = status
  }

  // tslint:disable-next-line:variable-name
  private _durationBeforeCallback = 0

  @Input() set durationBeforeCallback(num: number) {
    this.setDurationBeforeCallback(num)
  }

  // tslint:disable-next-line:variable-name
  private _text = ''

  @Input() get text(): string {
    return this._text
  }

  set text(text: string) {
    this.setText(text)
  }

  get aceEditor(): any {
    return this.editor
  }

  ngOnInit(): void {
    this.init()
    this.initEvents()
  }

  ngOnDestroy(): void {
    this.editor.destroy()
  }

  init(): void {
    this.editor.setOptions(this._options || {})
    this.editor.setTheme(`ace/theme/${this._theme}`)
    this.setMode(this._mode)
    this.editor.setReadOnly(this._readOnly)
  }

  initEvents(): void {
    this.editor.on('change', () => this.updateText())
    this.editor.on('paste', () => this.updateText())
  }

  updateText(): void {
    const newVal = this.editor.getValue()
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

  setMode(mode: any): void {
    this._mode = mode
    if (typeof this._mode === 'object') {
      this.editor.getSession().setMode(this._mode)
    } else {
      this.editor.getSession().setMode(`ace/mode/${this._mode}`)
    }
  }

  setText(text: any): void {
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

  setDurationBeforeCallback(num: number): void {
    this._durationBeforeCallback = num
  }
}
