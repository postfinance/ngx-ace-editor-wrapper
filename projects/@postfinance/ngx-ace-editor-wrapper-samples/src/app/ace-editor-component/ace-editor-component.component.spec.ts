import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AceEditorComponentComponent } from './ace-editor-component.component'

describe('AceEditorComponentComponent', () => {
  let component: AceEditorComponentComponent
  let fixture: ComponentFixture<AceEditorComponentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AceEditorComponentComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AceEditorComponentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
