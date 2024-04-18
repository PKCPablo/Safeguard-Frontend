import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
  result = "";
  isEnabled = true;

  testFunction(): void {
    if(this.isEnabled) {
      this.result = "It is enabled!";
    } else {
      this.result = "";
    }

    this.isEnabled = !this.isEnabled;
  }
}
