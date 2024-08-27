import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss', '../util.scss'],
})
export class CustomersPage implements OnInit {

  customers = [
    {
      id: '1234',
      name: 'Customer 1',
      paids: 1,
      opens: 1,
      overdues: 1,
    },
    {
      id: '6634',
      name: 'Customer 1',
      paids: 1,
      opens: 1,
      overdues: 1,
    },
    {
      id: '53676',
      name: 'Customer 1',
      paids: 1,
      opens: 1,
      overdues: 1,
    },
    {
      id: '3445',
      name: 'Customer 1',
      paids: 1,
      opens: 1,
      overdues: 1,
    },
    {
      id: '5435',
      name: 'Customer 1',
      paids: 1,
      opens: 1,
      overdues: 1,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
