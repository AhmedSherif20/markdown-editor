import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'evo-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent {
  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private dataService: DataService
  ) {}

  createFile() {
    this.dataService.createFile();
    // this.router.navigate(['/editor/new']);
  }

  chooseFile() {
    this.sidenavService.open();
  }
}
