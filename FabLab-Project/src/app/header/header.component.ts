import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleClicked = new EventEmitter<{currentStatus : string}>();
  status : string;

  constructor() {
  }

  ngOnInit() {
    this.status = "";
  }

  onHeaderToggle() {
    if (this.status === "active") {
      this.status = "";
    } else {
      this.status = "active";
    }

    this.toggleClicked.emit({
      currentStatus : this.status
    });
  }

}
