import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditorService } from 'src/app/services/editor.service';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { File } from 'src/app/models/file';

@Component({
  selector: 'evo-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  subs: Subscription[] = [];

  fileId: string;
  fileData: File;
  fileName: string;
  fileContent: string | undefined = ``;

  reviewCode: boolean = false;

  constructor(
    private editorService: EditorService,
    private dataService: DataService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get file data by id param
    this.subs.push(
      this.activatedRoute.params.subscribe((res) => {
        let { id } = res;
        if (id) {
          this.getFileData();
        }
      })
    );

    // on/off review mode
    this.subs.push(
      this.editorService.review.subscribe((res) => {
        this.reviewCode = res;
      })
    );
  }

  ngAfterViewInit(): void {
    this.subs.push(
      this.activatedRoute.params.subscribe((res) => {
        this.clearEditor();
      })
    );
  }

  getFileData() {
    this.fileName = '';
    this.fileContent = '';
    this.fileId = this.activatedRoute.snapshot.params['id'];
    this.fileData = this.dataService.getFileById(this.fileId);

    if (this.fileData) {
      let { name, content } = this.fileData;
      this.fileName = name;
      this.fileContent = content;
    }
  }

  toggleReview() {
    if (this.fileContent) {
      return this.editorService.toggleReview();
    } else if (
      !this.fileContent &&
      this.editorService.review.getValue() == true
    ) {
      return this.editorService.toggleReview();
    } else {
      return this.toastService.show('info', 'write any content to review');
    }
  }

  downloadFile() {
    if (this.fileContent) {
      let file: Blob = new Blob([this.fileContent], { type: 'md' });
      let a = document.createElement('a'),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = `${this.fileName}.md`;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    } else {
      this.toastService.show('info', 'write any content to download');
    }
  }

  saveFile() {
    if (this.fileId && this.fileName.length) {
      this.dataService.updateFile(
        this.fileId,
        this.fileName,
        this.fileContent!
      );
    } else {
      this.toastService.show('warning', 'file name required');
    }
  }

  deleteFile() {
    if (this.fileId) {
      this.dataService.deleteFile(this.fileId);
    }
  }

  clearEditor(): void {
    let editorContent: any = document.querySelector('#fileContent');
    editorContent!.value = null;
  }

  ngOnDestroy(): void {
    if (this.subs.length) this.subs.forEach((ele) => ele.unsubscribe());
  }
}
