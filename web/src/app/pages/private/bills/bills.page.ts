import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss', '../util.scss'],
})
export class BillsPage implements OnInit {

  bills = [
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
