# @postfinance/ngx-ace-editor-wrapper

Ace editor integration with TypeScript for Angular 10.

[![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)
[![License: Apache 2](https://img.shields.io/badge/License-Apache2-blue.svg)](https://opensource.org/licenses/Apache-2.0)

- [Examples](#examples)
- [Installation](#installation)
- [Usage](#usage)
- [Hat Tips](#hat-tips)
- [License](#license)

# Examples

There is a live example available on [GitHub Pages](https://postfinance.github.io/ngx-ace-editor-wrapper).

# Installation

`npm i @postfinance/ngx-ace-editor-wrapper`

## Loading the module:

```ts
import { AceEditorModule } from '@postfinance/ngx-ace-editor-wrapper';

@NgModule({
  ...
  imports: [
    ...
    AceEditorModule
  ]
})
```

# Usage

## Directive

> Minimal

```ts
// import { AceEditorModule } from '@postfinance/ngx-ace-editor-wrapper';

import { Component } from '@angular/core'

@Component({
  template: ` <div ngxAceEditor [(text)]="text"></div> `,
})
export class MyComponent {
  text: string = ''
}
```

> Complete

```ts
import { Component } from '@angular/core'

// Imports are important! You may configure it via `angular.json` as well.
import 'brace'
import 'brace/mode/sql'
import 'brace/theme/eclipse'

@Component({
  template: `
  <div ngxAceEditor
      [(text)]="text" // possible two way binding (thx ChrisProlls)
      [mode]="'sql'" //string or object (thx ckiffel)
      [theme]="'eclipse'"
      [options]="options"
      [readOnly]="false"
      [autoUpdateContent]="true" //change content when [text] change
      [durationBeforeCallback]="1000" //wait 1s before callback 'textChanged' sends new value
      (textChanged)="onChange($event)"
      style="min-height: 200px; width:100%; overflow: auto;">
  </div>
  `,
})
export class MyComponent {
  text: string = ''
  options: any = { maxLines: 1000, printMargin: false }

  onChange(code) {
    console.log('new code', code)
  }
}
```

## Component

```ts
import { Component, ViewChild } from '@angular/core'

import { AceEditorComponent } from '@postfinance/ngx-ace-editor-wrapper'

// Imports are important!
import 'brace'

@Component({
  template: `
    <ngx-ace-editor #editor [(text)]="text" style="height:150px;">
    </ngx-ace-editor>
  `,
})
export class AceCmp {
  @ViewChild(AceEditorComponent)
  editor

  text: string = ''

  ngAfterViewInit() {
    this.editor.setTheme('eclipse')

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true,
    })

    this.editor.getEditor().commands.addCommand({
      name: 'showOtherCompletions',
      bindKey: 'Ctrl-.',
      exec: function (editor) {},
    })
  }
}
```

# Hat Tips

- To Andrei Tumilovich for the original Angular 9 integration: [`tavwizard/ace-editor-ng9`](https://github.com/tavwizard/ace-editor-ng9)
- To Timon Borter for the Angular 10 migration: [`bbortt/ngx-ace-editor-wrapper`](https://github.com/bbortt/ngx-ace-editor-wrapper)

# License

This project is licensed under the terms of the [Apache 2.0 License](https://raw.githubusercontent.com/postfinance/ngx-ace-editor-wrapper/canary/LICENSE).
