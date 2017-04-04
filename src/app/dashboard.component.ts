import { Component, Input } from '@angular/core';

import { Company }   from './company';

import { CompanyService } from './company.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  providers: [CompanyService]
})
export class DashboardComponent {
  title = 'Dashboard';
  company: Company;

  constructor(private companyService: CompanyService) { }

  getCompany(companyName: string): void {
    this.company = this.companyService.getCompany(companyName);
  }
}
