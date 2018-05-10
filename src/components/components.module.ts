import { NgModule } from '@angular/core';
import { SelectSearchComponent } from './select-search/select-search';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
@NgModule({
	declarations: [SelectSearchComponent,
    ContentDrawerComponent],
	imports: [],
	exports: [SelectSearchComponent,
    ContentDrawerComponent]
})
export class ComponentsModule {}
