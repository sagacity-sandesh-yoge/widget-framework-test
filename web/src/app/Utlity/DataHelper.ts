export class DataHelper {

    static getTrimData<T>(request: T) {
        if (request) {
            for (let key of Object.keys(request)) {
                let value = request[key];
                if (typeof value === 'object') {
                    this.getTrimData(value)
                }
                else {
                    if (typeof value === 'string')
                        request[key] = value.trim();
                }
            }
        }
        return request;

    }

    static setRequired(input: any) {
        const isRequired = (input.ngControl && input.ngControl.control as any)?.isRequired || false;
        if (isRequired !== input.required) {
            input.required = isRequired;
        }
    }

    static getCurrentFinancialYear() {
        let startYear:any;
        var endYear:any;
        var currentDate = new Date();
        if ((currentDate.getMonth() + 1) <= 3) {
          startYear = currentDate.getFullYear() - 1;
          endYear = currentDate.getFullYear();
        } else {
          startYear = currentDate.getFullYear();
          endYear = currentDate.getFullYear() + 1;
        }
        let startDate : Date = new Date(`${startYear}/04/01`);
        let endDate:Date = new Date(`${endYear}/03/31`);

        return {startDate : startDate, endDate: endDate };
    }
      
}


