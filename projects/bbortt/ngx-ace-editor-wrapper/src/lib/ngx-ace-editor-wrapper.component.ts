import {Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import 'brace';
import 'brace/theme/monokai';

declare var ace: any;

@Component({
  selector: 'ace-editor',
  template: '',
  styles: [':host { display:block;width:100%; }'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AceEditorComponent),
    multi: true
  }]
})
export class AceEditorComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Output() textChanged = new EventEmitter();
  @Output() textChange = new EventEmitter();
  @Input() style: any = {};
  _editor: any;
  oldText: any;
  timeoutSaving: any;

  constructor(elementRef: ElementRef, private zone: NgZone) {
    const el = elementRef.nativeElement;
    this.zone.runOutsideAngular(() => {
      this._editor = ace.edit(el);
    });
    this._editor.$blockScrolling = Infinity;
  }

  _options: any = {};

  @Input() set options(options: any) {
    this.setOptions(options);
  }

  _readOnly = false;

  @Input() set readOnly(readOnly: any) {
    this.setReadOnly(readOnly);
  }

  _theme = 'monokai';

  @Input() set theme(theme: any) {
    this.setTheme(theme);
  }

  _mode: any = 'html';

  @Input() set mode(mode: any) {
    this.setMode(mode);
  }

  _autoUpdateContent = true;

  @Input() set autoUpdateContent(status: any) {
    this.setAutoUpdateContent(status);
  }

  _durationBeforeCallback = 0;

  @Input() set durationBeforeCallback(num: number) {
    this.setDurationBeforeCallback(num);
  }

  _text = '';

  get text() {
    return this._text;
  }

  @Input()
  set text(text: string) {
    this.setText(text);
  }

  get value() {
    return this.text;
  }

  @Input()
  set value(value: string) {
    this.setText(value);
  }

  ngOnInit() {
    this.init();
    this.initEvents();
  }

  ngOnDestroy() {
    this._editor.destroy();
  }

  init() {
    this.setOptions(this._options || {});
    this.setTheme(this._theme);
    this.setMode(this._mode);
    this.setReadOnly(this._readOnly);
  }

  initEvents() {
    this._editor.on('change', () => this.updateText());
    this._editor.on('paste', () => this.updateText());
  }

  updateText() {
    const newVal = this._editor.getValue();
    if (newVal === this.oldText) {
      return;
    }
    if (!this._durationBeforeCallback) {
      this._text = newVal;
      this.zone.run(() => {
        this.textChange.emit(newVal);
        this.textChanged.emit(newVal);
      });
      this._onChange(newVal);
    } else {
      if (this.timeoutSaving) {
        clearTimeout(this.timeoutSaving);
      }

      this.timeoutSaving = setTimeout(() => {
        this._text = newVal;
        this.zone.run(() => {
          this.textChange.emit(newVal);
          this.textChanged.emit(newVal);
        });
        this.timeoutSaving = null;
      }, this._durationBeforeCallback);
    }
    this.oldText = newVal;
  }

  setOptions(options: any) {
    this._options = options;
    this._editor.setOptions(options || {});
  }

  setReadOnly(readOnly: any) {
    this._readOnly = readOnly;
    this._editor.setReadOnly(readOnly);
  }

  setTheme(theme: any) {
    this._theme = theme;
    this._editor.setTheme(`ace/theme/${theme}`);
  }

  setMode(mode: any) {
    this._mode = mode;
    if (typeof this._mode === 'object') {
      this._editor.getSession().setMode(this._mode);
    } else {
      this._editor.getSession().setMode(`ace/mode/${this._mode}`);
    }
  }

  writeValue(value: any) {
    this.setText(value);
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  setText(text: any) {
    if (text === null || text === undefined) {
      text = '';
    }
    if (this._text !== text && this._autoUpdateContent === true) {
      this._text = text;
      this._editor.setValue(text);
      this._onChange(text);
      this._editor.clearSelection();
    }
  }

  setAutoUpdateContent(status: any) {
    this._autoUpdateContent = status;
  }

  setDurationBeforeCallback(num: number) {
    this._durationBeforeCallback = num;
  }

  getEditor() {
    return this._editor;
  }

  private _onChange = (_: any) => {
  };
}
