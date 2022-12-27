import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'evo-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() data: any;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {}

  deleteFile(id: string): void {
    this.dataService.deleteFile(id);
  }
}
