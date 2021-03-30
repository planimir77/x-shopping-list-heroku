import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy-content',
  templateUrl: './privacy-policy-content.component.html',
  styleUrls: ['./privacy-policy-content.component.scss']
})
export class PrivacyPolicyContentComponent implements OnInit {

  siteUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.siteUrl = window.location.origin;
  }

}
