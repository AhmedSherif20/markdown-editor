import { NgModule } from '@angular/core';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

const components: any[] = [NgbModule, NgbAlertModule];

@NgModule({
  exports: [components],
})
export class BsModule {}
