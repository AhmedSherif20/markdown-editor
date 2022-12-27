import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'evo-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  subs: Subscription[] = [];

  newUser: boolean = true;
  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.dataService.filesData.subscribe((res) => {
        this.newUser = res.length ? true : false;
      })
    );
  }

  createFile() {
    this.dataService.createFile();
    // this.router.navigate(['/editor/new']);
  }

  chooseFile() {
    this.sidenavService.open();
  }
}
