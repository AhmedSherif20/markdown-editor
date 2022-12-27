import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'evo-search-file',
  templateUrl: './search-file.component.html',
  styleUrls: ['./search-file.component.scss'],
})
export class SearchFileComponent {
  searchValue: string;

  constructor(private dataService: DataService) {}

  searchFile(e: any) {
    let name: string = e.target.value;

    if (name) {
      this.dataService.searchFile(name);
    } else {
      this.dataService.getAllFiles();
    }
  }
}
