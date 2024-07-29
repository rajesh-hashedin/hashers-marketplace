import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DB_NAME } from './core/constants/common';
import { sampleData } from './core/constants/sample-data';
import { DBService } from './core/services/db.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private db: DBService, private router: Router) {
    if (!localStorage.getItem(DB_NAME)) {
      localStorage.setItem(DB_NAME, JSON.stringify(sampleData));
    }
  }
  logout() {
    const allData = this.db.getAllData();
    allData.loggedInUser = sampleData.loggedInUser;
    this.db.setAllData(allData);
    this.router.navigate(['/login']);
  }
}
