import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { APP_SETTING } from 'src/app/constants/app-repo.constants';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';

@Pipe({
  name: 'transformDateTime'
})
export class TransformDateTimePipe implements PipeTransform {

  constructor(public _appRepoHelperService: AppRepoHelperService, private datePipe: DatePipe) {
  }
  
  transform(datetime: Date | string): string {
    if (datetime) {
      datetime = new Date(datetime);
      const dateTimeformat = this._appRepoHelperService.getAppSTByCode(APP_SETTING.DATE_TIME_FORMAT)
      return this.datePipe.transform(datetime
      , dateTimeformat.Value)
    }
    return null;
  }

}