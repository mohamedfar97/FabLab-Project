import { Component, OnInit } from '@angular/core';
import { GitLabService } from '../../services/gitlab.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import {stringifyElement} from "@angular/platform-browser/testing/src/browser_util";
//import {jsonParser} from 'big-json-streamer';



@Component({
  selector: 'app-repofiles',
  templateUrl: './repofiles.component.html',
  styleUrls: ['./repofiles.component.css']
})

export class RepofilesComponent implements OnInit {
  project_id: string;
  files = [];
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
              private spinnerService: NgxSpinnerService,
              private http: Http,
              private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.project_id = queryParams['project_id'];
    });

    this.spinnerService.show();
    this.gitLabService.getProjectFiles(this.project_id)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        this.files = JSON.parse(res._body);
        console.log(this.files);
    });
  }

  public dropped(event: UploadEvent) {
    this.uploadedFiles = event.files;

     interface  Action   {
       action : string ;
       file_path : string ;
       encoding : string ;
       content : string ;
     }






    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {

          var action = {
            action : 'create',
            file_path : droppedFile.relativePath,
            encoding : 'base64',
            content : ''
          };

          // Here you can access the real file


          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
           fileReader.onload = (e) => {


             console.log(fileReader.result);

             let ReqBody =  {

               branch : 'master',
               commit_message: 'test commit message',
               actions : [
                  {
                   action : 'create',
                   file_path : droppedFile.relativePath,
                    encoding : 'base64',
                   content : fileReader.result.replace(/^data:(image|application)\/(png|jpg|pdf);base64,/, '')
                 }

           ]

             };


             for (const existingFile of this.files) {

               if ( existingFile.path === droppedFile.relativePath ) {
                 ReqBody.actions[0].action = 'update';
               }
             }


             this.gitLabService.uploadFile(this.project_id , ReqBody ).subscribe((res) => {
               console.log(res);
             });

           };
        });

      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }

    }







  }



}

