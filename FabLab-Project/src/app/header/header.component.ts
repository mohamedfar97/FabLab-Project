import { Component, OnInit } from '@angular/core';
import{SidebarComponent} from './sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  status : boolean = true;
  constructor(private sidebar : SidebarComponent) {

  }

  ngOnInit() {

  }
  onClick(){
    if(this.status){
      this.sidebar.hide();
    }else{
        this.sidebar.show();
    }

  }

}
