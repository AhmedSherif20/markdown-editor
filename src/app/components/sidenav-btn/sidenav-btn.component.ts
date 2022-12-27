import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'evo-sidenav-btn',
  templateUrl: './sidenav-btn.component.html',
  styleUrls: ['./sidenav-btn.component.scss'],
})
export class SidenavBtnComponent implements OnInit {
  openSidenav: boolean = false;

  constructor(private sidenav: SidenavService) {}

  ngOnInit(): void {
    this.sidenav.sidenavStatus.subscribe((res) => {
      this.openSidenav = res;
    });
  }

  toggleSidenav(): void {
    this.openSidenav = !this.openSidenav;
    this.sidenav.toggle();
  }
}
