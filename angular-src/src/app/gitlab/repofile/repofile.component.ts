import { Component, OnInit } from '@angular/core';
import { GitLabService } from "../../services/gitlab.service";
import { ActivatedRoute, Params } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-repofile',
  templateUrl: './repofile.component.html',
  styleUrls: ['./repofile.component.css']
})
export class RepofileComponent implements OnInit {
  isImage : boolean = false;
  file;
  fileContent : any ="" ;
  fileName = "";
  fileSize = 0;
  project_id : string;
  path: string;


  public editorOptions = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button

    ['link', 'image', 'video']                         // link and image, video
  ]
};

  constructor(private gitLabService : GitLabService,
              private route:ActivatedRoute,
              private _sanitizer: DomSanitizer,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {

    this.spinnerService.show();
    this.route.queryParams
      .subscribe((queryParams : Params) => {
        this.project_id = queryParams['project_id'];
        this.path = queryParams['path'];
        this.isImage = this.path.includes('png') || this.path.includes('jpg') || this.path.includes('pdf');



        this.gitLabService.getFile(this.project_id,this.path)
          .subscribe((res : any) => {

            this.file = JSON.parse(res._body);
            this.fileName = this.file.file_name;
            this.fileSize = this.file.size;
            console.log(this.file);
            if( this.path.includes('png') ){
              this.fileContent = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
                         + this.file.content);
            }else if(this.path.includes('jpg')){
              this.fileContent = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                + this.file.content);

            }else if(this.path.includes('pdf')){
              this.fileContent = this._sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,'
                + this.file.content);

            }else {
                this.fileContent = atob(this.file.content);
            }
            this.spinnerService.hide();
        } , (error) => {
            console.log("Error While Loading File");
          });
      });
  }
}
