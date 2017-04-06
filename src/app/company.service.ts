import { Injectable } from '@angular/core';

import { Company }    from './company';
import { COMPANIES }  from './mock-companies';

@Injectable()
export class CompanyService {
  getCompany(companyName: string): Promise<Company> {
    for (let c of COMPANIES) {
      if(c.name === companyName) {
        return Promise.resolve(c);
      }
    }
  }
}
