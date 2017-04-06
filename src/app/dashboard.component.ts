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
  search: string;
  company: Company = null;

  constructor(private companyService: CompanyService) { }

  getCompany(companyName: string): void {
    this.companyService.getCompany(companyName)
      .then(company => this.company = company);
  }
}
