import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  sidenavStatus: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor() {}
  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    this.sidenavStatus.next(true);
    return this.sidenav.open();
  }

  public close() {
    this.sidenavStatus.next(false);
    return this.sidenav.close();
  }

  public toggle(): void {
    let value = this.sidenavStatus.getValue();
    this.sidenavStatus.next(!value);
    this.sidenav.toggle();
  }
}
