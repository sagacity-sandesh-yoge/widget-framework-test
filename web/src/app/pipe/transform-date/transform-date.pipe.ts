import { Pipe, PipeTransform } from '@angular/core';
import { AppRepoService } from 'src/app/services/common/app-repo.service';
import { DatePipe } from '@angular/common';
import { APP_SETTING } from 'src/app/constants/app-repo.constants';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';

@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  constructor(public _appRepoHelperService: AppRepoHelperService, private datePipe: DatePipe) {
  }
  
  transform(date: Date | string): string {
    if (date) {
      date = new Date(date);
      const dateformat = this._appRepoHelperService.getAppSTByCode(APP_SETTING.DATE_FORMAT)
      return this.datePipe.transform(date, dateformat.Value)
    }
    return null;
  }

}
