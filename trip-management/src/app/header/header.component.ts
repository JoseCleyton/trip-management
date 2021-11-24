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
      '/customer-service': 'Chamados',
      '/customer-service/details': 'Chamados',
      '/dashboard': 'Dashboard',
      '/dashboard/adm': 'Dashboard',
      '/dashboard/technician': 'Dashboard',
      '/client': 'Clientes',
      '/report': 'Relatório',
      '/technician': 'Técnicos',
      '/cost-center': 'Centros de Custo',
      '/user': 'Usuários',
    };
    return TITLE[url];
  }
}
