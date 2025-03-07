import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@Component({
  
  selector: 'app-root',
  imports: [ HttpClientModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
  
})
export class AppComponent {
  title = 'gestions-voyages-etudes';
}
