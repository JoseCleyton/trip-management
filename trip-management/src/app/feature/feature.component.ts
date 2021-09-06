import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth;
  }

  public subscription: Subscription = new Subscription();
  public width;

  constructor() {}

  ngOnInit(): void {
    this.width = window.innerWidth;
  }
}
