import { Component, OnInit } from '@angular/core';
import { GitLabService } from '../../services/gitlab.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver/FileSaver';
import * as FileSaver from "file-saver";

import {HttpClient , HttpRequest , HttpResponse , HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-repofiles',
  templateUrl: './repofiles.component.html',
  styleUrls: ['./repofiles.component.css']
})

export class RepofilesComponent implements OnInit {
  project_id : string;
  fullPath : string;
  files = [];
  treeFiles = [];
  uploadRequests = [];
  uploadInfo = [];

  public uploadedFiles: UploadFile[] = [];


  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png',
    maxSize: '10',
    uploadAPI:  {
      url: 'https://gitlab.com/api/v4/projects/8151323/uploads',
      headers: {
        "Content-Type" : "multipart/form-data",
        "PRIVATE-TOKEN" : "LcFvA-rWy39-ZXEye9Vx"
      }
    },
    theme: 'dragNDrop',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: true
  };

  constructor(private gitLabService: GitLabService,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private http: Http,
              private _sanitizer: DomSanitizer,
              private modalService: NgbModal) {
  }


  closeResult: string;
  modalReference: NgbModalRef;
  commitMessage = 'Message';

  ngOnInit() {
   this.uploadRequests = [];
   this.uploadInfo = [];
   this.uploadedFiles = [];

    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.project_id = queryParams['project_id'];
        this.fullPath = queryParams['full_path'];
    });

    this.spinnerService.show();
    this.gitLabService.getProjectFiles(this.project_id)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        this.files = JSON.parse(res._body);

        for ( let i = 0; i < this.files.length; i++ ) {
          if ( this.files[i].type === "tree") {
            this.treeFiles.push(this.files[i]);
            this.files.splice(i,1);
            i--;
          }
        }
        console.log(this.files);
        console.log(this.treeFiles);
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  Close() {
    this.modalReference.dismiss();
  }

  public dropped(event: UploadEvent) {

    
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);

     interface  Action   {
       action : string ;
       file_path : string ;
       encoding : string ;
       content : Blob ;
     }

    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {

          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
           fileReader.onload = (e) => {


             console.log(fileReader.result);
            

             let ReqBody =  {

               branch : 'master',
               commit_message: this.commitMessage,
               actions : [
                  {
                   action : 'create',
                   file_path : droppedFile.relativePath,
                    encoding : 'base64',
                   content : fileReader.result.replace(/^data:(image|application)\/(png|jpg|pdf|jpeg);base64,/, '')
                 }
                ]
             };

             

             for (const existingFile of this.files) {

               if ( existingFile.path === droppedFile.relativePath ) {
                 ReqBody.actions[0].action = 'update';
               }
             }

             let fileInfo = {
              name : file.name,
              size : file.size,
              lastModified : file.lastModified,
              status : ReqBody.actions[0].action

             };

             this.uploadRequests.push(ReqBody);
             this.uploadInfo.push(fileInfo);

            

           };
        });

      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }

    }


  }


  push(){
    console.log(this.uploadRequests);

    for (const i in this.uploadRequests){
      console.log(this.uploadRequests[i]);

      this.gitLabService.uploadFile(this.project_id , this.uploadRequests[i] ).subscribe((event) => {

        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          console.log(event);
          const percentDone = Math.round(100 * event.loaded / event.total);
          
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
       
      });
      

    }
   this.uploadRequests = [];
   this.uploadInfo = [];
   this.uploadedFiles = [];
  }

  saveToFileSystem() {
    this.spinnerService.show();
    let projectName = "Project_" + this.project_id;
    this.gitLabService.downloadProject(this.project_id , projectName , undefined)
      .subscribe( (res:any) => {
        this.spinnerService.hide();
        let blob = new Blob([res._body]);
        let file = new File([blob],projectName + '.tar.gz');
        FileSaver.saveAs(file);
      } , ( err ) => {
        alert(JSON.parse(err._body).errMsg);
      });
  }

  onOpenFolder(folder) {
    this.router.navigate(['/gitlab/subdirectory'],
      { queryParams: {
          full_path: this.fullPath,
          project_id: this.project_id,
          path: folder.path
        }
      });
      
      this.ngOnInit();
  }
  
}


