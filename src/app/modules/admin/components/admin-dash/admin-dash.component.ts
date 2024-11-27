import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit() {
    // Detectar si estamos en una pantalla pequeña
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        map(result => result.matches)
      )
      .subscribe(isMobile => {
        this.isMobile = isMobile;
      });
  }

  onTabChange(event: any) {
    // Manejar la navegación programática cuando cambia la pestaña
    switch (event.index) {
      case 0:
        this.router.navigate(['/admin/registroTest']);
        break;
      case 1:
        this.router.navigate(['/admin/crear-experto']);
        break;
      case 2:
        this.router.navigate(['/admin/recurso-educativo']);
        break;
    }
  }
}
