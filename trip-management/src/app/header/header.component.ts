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
      '/feature/customer-service': 'Chamados',
      '/feature/dashboard': 'Dashboard',
      '/feature/client': 'Clientes',
      '/feature/report': 'Relatório',
      '/feature/technician': 'Técnicos',
      '/feature/cost-center': 'Centros de Custo',
      '/feature/user': 'Usuários'
    };
    return TITLE[url];
  }
}
