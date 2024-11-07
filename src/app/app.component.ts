import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  currentRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getRole().subscribe((role) => {
      this.currentRole = role;
    });
  }
}
