import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { File } from '../models/file';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  databaseName = `filesData`;
  filesData: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);

  constructor(private router: Router, private toastService: ToastService) {
    let dataJson = JSON.parse(localStorage.getItem(this.databaseName) || '[]');
    this.filesData.next(dataJson);
  }

  setData(data: any) {
    localStorage.setItem(this.databaseName, JSON.stringify(data));
    this.filesData.next(data);
  }

  uniqueId() {
    let id = `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .substr(2)}`;
    return id;
  }

  //full crud operation

  // create
  async createFile(): Promise<void> {
    const { value: name } = await Swal.fire({
      input: 'text',
      inputLabel: `Enter Your Folder Name`,
      inputPlaceholder: 'Ex. Variables',
    });

    if (name && name.length) {
      let newFile: File = {
        id: this.uniqueId(),
        name,
        content: '',
      };

      let dataBase = this.filesData.getValue(); // files arr
      dataBase.push(newFile); // push new file to arr of files
      this.setData(dataBase); // set new data in localstorage then in observable
      this.router.navigate(['/editor/file', newFile.id]);
      Swal.fire(`Folder: ${name} Created Successfully`, '', 'success');
    } else {
      Swal.fire(`Name Is Required`, '', 'warning');
    }
  }

  // read
  getAllFiles(): void {
    let dataJson = JSON.parse(localStorage.getItem(this.databaseName) || '[]');
    this.filesData.next(dataJson);
  }

  getFileById(id: string): File | any {
    let allFiles = this.filesData.getValue();
    let currentFile = allFiles.find((ele) => ele.id == id);

    if (currentFile) {
      return currentFile;
    } else {
      this.router.navigate(['/editor/start']);
      return Swal.fire(`Invaild File Id`, '', 'error');
    }
  }

  searchFile(name: string): void {
    let allFiles = JSON.parse(localStorage.getItem(this.databaseName) || '[]');
    let foundFiles = allFiles.filter(
      (ele: File) => ele.name.includes(name) || ele.name == name
    );

    this.filesData.next(foundFiles ?? []);
  }

  // update
  updateFile(id: string, name: string, content: string) {
    const oldFilesData: File[] = JSON.parse(
      localStorage.getItem(this.databaseName) || '[]'
    );
    const newFilesData: File[] = oldFilesData.map((file: File) => {
      if (file.id === id) {
        return { ...file, name, content };
      }
      return file;
    });
    this.setData(newFilesData);
    this.toastService.show('success', 'file saved successfully');
    console.log(newFilesData);
  }

  // delete
  deleteFile(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let dataBase = this.filesData.getValue();
        dataBase = dataBase.filter((ele) => ele.id != id);
        this.setData(dataBase);
        this.router.navigate(['/editor/start']);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
