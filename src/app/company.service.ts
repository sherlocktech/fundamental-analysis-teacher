import { Injectable } from '@angular/core';

import { Company }    from './company';
import { COMPANIES }  from './mock-companies';

@Injectable()
export class CompanyService {
  getCompany(companyName: string): Company {
    for (let c of COMPANIES) {
      if(c.name === companyName) {
        return c;
      }
    }
  }
}
