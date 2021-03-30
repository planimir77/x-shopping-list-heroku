import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  initialDate: number = 2020;
  dateNow: Date = new Date();
  dateNowToString: string = '';
  constructor() { }

  ngOnInit(): void {
    if ((this.dateNow.getFullYear() - this.initialDate) !== 0) {
      this.dateNowToString = ' - ' + this.dateNow.getFullYear();
    }
  }
}
