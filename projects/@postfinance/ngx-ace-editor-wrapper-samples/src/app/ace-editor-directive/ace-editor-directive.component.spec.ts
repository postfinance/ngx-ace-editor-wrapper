import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AceEditorDirectiveComponent } from './ace-editor-directive.component'

describe('AceEditorDirectiveComponent', () => {
  let component: AceEditorDirectiveComponent
  let fixture: ComponentFixture<AceEditorDirectiveComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AceEditorDirectiveComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AceEditorDirectiveComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
