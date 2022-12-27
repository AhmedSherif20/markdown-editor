import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'evo-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  // files: any = [
  //   {
  //     name: 'Photos',
  //     type: 'folder',
  //     files: [
  //       {
  //         name: 'friends',
  //         type: 'file',
  //       },
  //       {
  //         name: 'family',
  //         type: 'file',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'customers',
  //     type: 'file',
  //   },
  //   {
  //     name: 'Docs',
  //     type: 'folder',
  //     files: [
  //       {
  //         name: 'school',
  //         type: 'file',
  //       },
  //       {
  //         name: 'collage',
  //         type: 'file',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'notes',
  //     type: 'file',
  //   },
  //   {
  //     name: 'Materials',
  //     type: 'folder',
  //   },
  //   {
  //     name: 'demo',
  //     type: 'folder',
  //     files: [
  //       {
  //         name: 'test',
  //         type: 'file',
  //       },
  //     ],
  //   },
  // ];

  files: any[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.filesData.subscribe((res) => {
      this.files = res;
    });
  }
}
