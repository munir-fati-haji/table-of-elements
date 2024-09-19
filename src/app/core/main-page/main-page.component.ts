import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CONSTANTS } from '../../shared/constants/constants';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    MatCardModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  public menuItems: MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'Elements',
      route: 'elements',
    },
  ];
  public collapsed = signal(true);
  public sidenavWidth = computed(() => (this.collapsed() ? '60px' : '200px'));
  protected readonly COMPANY_NAME = CONSTANTS.COMPANY.NAME;
  protected readonly APPLICATION_NAME = CONSTANTS.COMPANY.APPLICATION;
  protected readonly LOGO = CONSTANTS.COMPANY.LOGO;
}
