# @bbortt/ngx-ace-editor-wrapper
> Ace editor integration with TypeScript for Angular 10.

[![npm version](https://badge.fury.io/js/ngx-ace-editor-wrapper.svg)](https://www.npmjs.com/package/@bbortt/ngx-ace-editor-wrapper) 

## Installation
`npm i ngx-ace-editor-wrapper`

### Loading the module:

```ts
import { AceEditorModule } from '@bbortt/ngx-ace-editor-wrapper';

@NgModule({
  ...
  imports: [
    ...
    AceEditorModule
  ]
})
```

## Usage
### Directive

> Minimal
>
```ts
//import { AceEditorModule } from '@bbortt/ngx-ace-editor-wrapper';

import { Component } from '@angular/core';

@Component({
  template: `
  <div ace-editor
       [(text)]="text" // possible two way binding (thx ChrisProlls)
       ></div>
  `
})
export class MyComponent {
    text:string = "";
}
```

> Complete

```ts
import { Component } from '@angular/core';

//to use theme "eclipse"
//with angular-cli add "../node_modules/ace-builds/src-min/ace.js" 
//and "../node_modules/ace-builds/src-min/theme-eclipse.js" to "scripts" var into the file angular-cli.json

@Component({
  template: `
  <div ace-editor
       [(text)]="text" // possible two way binding (thx ChrisProlls)
       [mode]="'sql'" //string or object (thx ckiffel)
       [theme]="'eclipse'"
       [options]="options"
       [readOnly]="false"
       [autoUpdateContent]="true" //change content when [text] change
       [durationBeforeCallback]="1000" //wait 1s before callback 'textChanged' sends new value
       (textChanged)="onChange($event)"
       style="min-height: 200px; width:100%; overflow: auto;"></div>
  `
})
export class MyComponent {
    text:string = "";
    options:any = {maxLines: 1000, printMargin: false};
    
    onChange(code) {
        console.log("new code", code);
    }
}
```

### Component

```ts
import {Component, ViewChild} from '@angular/core';

//to use theme eclipse
//with angular-cli add "../node_modules/ace-builds/src-min/ace.js" 
//and "../node_modules/ace-builds/src-min/theme-eclipse.js" to "scripts" var into the file angular-cli.json

@Component({
    template: `
  <ace-editor
       [(text)]="text" // possible two way binding (thx ChrisProlls)
        #editor style="height:150px;"></ace-editor>
  `
})
export class AceCmp {
    @ViewChild('editor') editor;
    text: string = "";

    ngAfterViewInit() {
        this.editor.setTheme("eclipse");

        this.editor.getEditor().setOptions({
            enableBasicAutocompletion: true
        });

        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {

            }
        })
    }
}
```

## Hat Tips

* To Andrei Tumilovich for the original Angular 9 integration: [`tavwizard/ace-editor-ng9`](https://github.com/tavwizard/ace-editor-ng9)

## License
This project is licensed under the terms of the [Apache 2.0 License](https://raw.githubusercontent.com/bbortt/ngx-ace-editor-wrapper/canary/LICENSE).
