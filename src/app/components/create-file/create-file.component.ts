import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'evo-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss'],
})
export class CreateFileComponent {
  constructor(
    private toastService: ToastService,
    private dataService: DataService
  ) {}

  async createFile() {
    await this.dataService.createFile();
  }
}
