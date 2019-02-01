import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Params, Router} from "@angular/router";
import { GitLabService } from "../../../services/gitlab.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-folder-files',
  templateUrl: './folder-files.component.html',
  styleUrls: ['./folder-files.component.css']
})
export class FolderFilesComponent implements OnInit {

  projectId: string;
  fullPath: string;
  folderPath: string;
  directoryPath: string;
  folderFiles ;
  treeFolderFiles;

  constructor(private gitLabService: GitLabService,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService) {

                this.route.queryParams
                .subscribe((queryParams: Params) => {
                  this.projectId = queryParams['project_id'];
                  this.fullPath = queryParams['full_path'];
                  this.folderPath = encodeURIComponent(queryParams['path']);
                });
              }

   ngOnInit(){

    this.directoryPath = this.fullPath+'/'+this.folderPath.replace(/%2F/g,'/');;

    
    

    console.log(this.directoryPath);
    
    this.folderFiles = [];
    this.treeFolderFiles = [];

    console.log(this.folderPath);

    this.spinnerService.show();
    this.gitLabService
      .getSubdirectoriesContent(this.projectId , this.folderPath)
      .subscribe( (res:any) => {
        this.spinnerService.hide();
        this.folderFiles = JSON.parse(res._body);

        for ( let i = 0; i < this.folderFiles.length; i++ ) {
          if ( this.folderFiles[i].type === "tree" ) {
            this.treeFolderFiles.push(this.folderFiles[i]);
            this.folderFiles.splice(i,1);
            i--;
          }
        }

      console.log(this.folderFiles);
      console.log(this.treeFolderFiles);

      }, (error) => {
        console.log(error);
      })
  }

  onOpenFile(file) {
    const urlEncodedPath = encodeURIComponent(file.path);
    console.log(urlEncodedPath);
    this.router.navigate(['/gitlab/repofile'] ,
      {
        queryParams: {
          project_id : this.projectId,
          path: urlEncodedPath
        }
      });
  }

  onOpenFolder(folder) {
   
    this.folderPath = encodeURIComponent(folder.path);

    this.router.navigate(['/gitlab/subdirectory'],
    { queryParams: {
        full_path: this.fullPath,
        project_id: this.projectId,
        path: folder.path
      }
    });
    
    this.ngOnInit();
  }

  onBack(){
    
    if(!this.folderPath.includes("%")){
      
      this.router.navigate(['/gitlab/repofiles'],
      { queryParams: {
          full_path: this.fullPath,
          project_id: this.projectId
        }
      });
      this.ngOnInit();
    }else{
      let indx = this.folderPath.lastIndexOf('%');
      let newPath = this.folderPath.slice(0,indx);
      this.folderPath = newPath;
      this.router.navigate(['/gitlab/subdirectory'],
      { queryParams: {
          full_path: this.fullPath,
          project_id: this.projectId,
          path: newPath
        }
      });
      
      this.ngOnInit();
    }
   
  }
  
}
