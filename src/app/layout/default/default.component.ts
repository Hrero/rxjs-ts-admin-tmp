import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class LayoutDefaultComponent implements OnInit {

  constructor() { }
  isCollapsed = false;
  ngOnInit() {
  }

}
