import { Component, ViewChild, type TemplateRef } from '@angular/core';

@Component({
  selector: 'shared-icons',
  templateUrl: './icons.component.html'
})
export class IconsComponent {

  @ViewChild('saveIcon', { static: true })
  readonly saveIcon!: TemplateRef<unknown>;

  @ViewChild('insertRowArrow', { static: true })
  readonly insertRowArrow!: TemplateRef<unknown>;

  // @ViewChild('editIcon', { static: true })
  // readonly editIcon!: TemplateRef<unknown>;
  //
  // @ViewChild('deleteIcon', { static: true })
  // readonly deleteIcon!: TemplateRef<unknown>;
}
