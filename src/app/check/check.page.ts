import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {

  data = [
    {
      loadCapacity: '1600',
      selected: false
    },
    {
      loadCapacity: '1800',
      selected: true
    },
    {
      loadCapacity: '2000',
      selected: false
    },
    {
      loadCapacity: '3000',
      selected: false
    },
    {
      loadCapacity: '4000',
      selected: true
    },
    {
      loadCapacity: '4500',
      selected: false
    },
    {
      loadCapacity: '4990',
      selected: false
    }
  ];
  constructor() { }

  ngOnInit() {
  }
onClick( check ){
  console.log(check);
}
}
