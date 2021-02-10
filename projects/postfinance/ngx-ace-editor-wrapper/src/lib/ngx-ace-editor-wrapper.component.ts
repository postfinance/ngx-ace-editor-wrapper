import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

declare let ace: any

@Component({
  selector: 'ngx-ace-editor',
  template: '',
  styles: [':host { display:block;width:100%; }'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AceEditorComponent),
      multi: true,
    },
  ],
})
export class AceEditorComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() style: any = {}

  @Output() textChanged = new EventEmitter()
  @Output() textChange = new EventEmitter()

  oldText: any
  timeoutSaving: any

  private editor: any

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _options: any = {}

  @Input() set options(options: any) {
    this.setOptions(options)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _readOnly = false

  @Input() set readOnly(readOnly: any) {
    this.setReadOnly(readOnly)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _theme = 'monokai'

  @Input() set theme(theme: any) {
    this.setTheme(theme)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _mode: any = 'html'

  @Input() set mode(mode: any) {
    this.setMode(mode)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _autoUpdateContent = true

  @Input() set autoUpdateContent(status: any) {
    this.setAutoUpdateContent(status)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _durationBeforeCallback = 0

  @Input() set durationBeforeCallback(num: number) {
    this.setDurationBeforeCallback(num)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _text = ''

  get text(): string {
    return this._text
  }

  @Input() set text(text: string) {
    this.setText(text)
  }

  get value(): string {
    return this.text
  }

  @Input()
  set value(value: string) {
    this.setText(value)
  }

  constructor(elementRef: ElementRef, private zone: NgZone) {
    const el = elementRef.nativeElement
    this.zone.runOutsideAngular(() => {
      this.editor = ace.edit(el)
    })
    this.editor.$blockScrolling = Infinity
  }

  ngOnInit(): void {
    this.init()
    this.initEvents()
  }

  ngOnDestroy(): void {
    this.editor.destroy()
  }

  init(): void {
    this.setOptions(this._options || {})
    this.setTheme(this._theme)
    this.setMode(this._mode)
    this.setReadOnly(this._readOnly)
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
      this._onChange(newVal)
    } else {
      if (this.timeoutSaving) {
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

  setOptions(options: any): void {
    this._options = options
    this.editor.setOptions(options || {})
  }

  setReadOnly(readOnly: any): void {
    this._readOnly = readOnly
    this.editor.setReadOnly(readOnly)
  }

  setTheme(theme: any): void {
    this._theme = theme
    this.editor.setTheme(`brace/theme/${theme}`)
  }

  setMode(mode: any): void {
    this._mode = mode
    if (typeof this._mode === 'object') {
      this.editor.getSession().setMode(this._mode)
    } else {
      this.editor.getSession().setMode(`brace/mode/${this._mode}`)
    }
  }

  writeValue(value: any): void {
    this.setText(value)
  }

  registerOnChange(fn: any): void {
    this._onChange = fn
  }

  registerOnTouched(fn: any): void {}

  setText(text: any): void {
    if (text === null || text === undefined) {
      text = ''
    }
    if (this._text !== text && this._autoUpdateContent === true) {
      this._text = text
      this.editor.setValue(text)
      this._onChange(text)
      this.editor.clearSelection()
    }
  }

  setAutoUpdateContent(status: any): void {
    this._autoUpdateContent = status
  }

  setDurationBeforeCallback(num: number): void {
    this._durationBeforeCallback = num
  }

  getEditor(): any {
    return this.editor
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  private _onChange = (_: any) => {}
}
