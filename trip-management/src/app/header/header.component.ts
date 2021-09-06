import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public title = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = this.getTitle(this.router.url);
  }

  private getTitle(url: string): string {
    const TITLE = {
      '/feature/church': 'Igrejas',
      '/feature/dashboard': 'Dashboard',
      '/feature/christians': 'Dizimistas',
      '/feature/report': 'Relatório',
      '/feature/message': 'Mensagens',
    };
    return TITLE[url];
  }
}
