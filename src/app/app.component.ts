import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElementsComponent } from './modules/elements/elements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ElementsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
