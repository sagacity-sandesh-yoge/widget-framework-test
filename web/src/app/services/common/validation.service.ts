import { Injectable } from '@angular/core';
import { AbstractControl, Validators, FormGroup, FormBuilder, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationModel, ValidatorsModel } from 'src/app/models/common/validators.model';
import { WidgetHelper } from 'src/app/modules/widget-utility/widget-helper';
export function customRequiredValidator(control: AbstractControl): ValidationErrors | null {
    if (control) {
        (control as any).isRequired = true;
    }
    return Validators.required(control);
}


@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    constructor(
        private formBuilder: FormBuilder
    ) {
        const _setValidators = AbstractControl.prototype.setValidators;
        AbstractControl.prototype.setValidators = function (newValidator: ValidatorFn | ValidatorFn[] | null): void {
            if (this) {
                (this as any).isRequired = false;
            }
            _setValidators.call(this, newValidator);
        }

        const _clearValidators = AbstractControl.prototype.clearValidators;
        AbstractControl.prototype.clearValidators = function () {
            if(this){
                (this as any).isRequired = false;
            }
            
            _clearValidators.call(this);
        }
    }
    createFormGroup(formData, permissions?: any, mode?: string) {

        const group = this.formBuilder.group({}, { validator: this.bindValidations(formData.groupValidations) });
        if (formData && formData.controls) {
            formData.controls.forEach(formControl => {

                if (formControl.controlType == "formarray") {
                    let control = null;
                    if (formControl && formControl.controls) {
                        control = this.formBuilder.array([this.createFormGroup(formControl)]);
                    } else {
                        control = this.formBuilder.array([]);
                    }

                    group.addControl(formControl.controlName, control);
                } else {

                    // let visiblePermission = WidgetHelper.getVisiblePermissions(formControl.controlName, permissions, mode);
                    let validation: ValidatorFn = null;
                    // if (visiblePermission) {
                    //     validation = this.bindValidations(formControl.validations || [])
                    // }
                    validation = this.bindValidations(formControl.validations || [])
                    const control: FormControl = this.formBuilder.control(
                        formControl.value,
                        validation
                    );
                    group.addControl(formControl.controlName, control);
                }
            });
        }


        return group;

    }

    getValidator(validation: any) {
        switch (validation.name) {
            case "required":
                validation.defaultMessage = 'This field is required';
                return ValidationService.validatorFn(validation, customRequiredValidator);
            case "minlength":
                validation.defaultMessage = `Min length is ${validation.params}`;
                return ValidationService.validatorFn(validation, Validators.minLength(validation.params));
            case "maxlength":
                validation.defaultMessage = `Max length is ${validation.params}`;
                return ValidationService.validatorFn(validation, Validators.maxLength(validation.params));
            case "min":
                validation.defaultMessage = `Minimum number can be ${validation.params}`;
                return ValidationService.validatorFn(validation, Validators.min(validation.params));
            case "max":
                validation.defaultMessage = `Maximum  required number is ${validation.params}`;
                return ValidationService.validatorFn(validation, Validators.max(validation.params));
            case "extensionNoValidator":
                validation.defaultMessage = 'This field is invalid';
                return ValidationService.validatorFn(validation, ValidationService.extensionNoValidator);
            case "email":
                validation.defaultMessage = 'Please enter a valid email address';
                return ValidationService.validatorFn(validation, Validators.email);
            case "pattern":
                validation.defaultMessage = 'This field is invalid';
                return ValidationService.validatorFn(validation, Validators.pattern(validation.params));
            case "dateCompare":
                validation.defaultMessage = 'Invalid field';
                return ValidationService.dateCompare(validation);
            case "dataCompare":
                validation.defaultMessage = 'fields should match';
                return ValidationService.dataCompare(validation);
            case "phonePattern":
                validation.defaultMessage = 'Please enter a valid phone number';
                return ValidationService.validatorFn(validation, Validators.pattern('^(\\+91[\\-\\s]?)?[0]?(91)?[01234567896]\\d{9}$'));
            case "IndiaPhonePattern":
                    validation.defaultMessage = 'Please enter a valid phone number';
                    return ValidationService.validatorFn(validation, Validators.pattern('^(\\+91[\\-\\s]?)?[0]?(91)?[0123456789]\\d{9}$'));
                

        }
    }

    bindValidations(validations: any) {

        if (validations && validations.length > 0) {
            const validList = [];
            validations.forEach(validation => {
                let validator;
                validator = this.getValidator(validation);
                validList.push(validator);
            });
            return Validators.compose(validList);
        }
        return null;

    }


    static dataCompare(validation: ValidationModel): ValidatorFn {
        return (group: FormGroup): { [key: string]: boolean } | null => {
            if (group) {

                let field1Value = group.get(validation.field1) ? group.get(validation.field1).value : null;
                let field2Value = group.get(validation.field2) ? group.get(validation.field2).value : null;
                
                switch(validation.dataType)
                {
                    case "number":
                        field1Value = +field1Value;
                        field2Value = +field2Value;
                        break;
                }

                if (field1Value && field2Value) {
                    let validateResult = false;
                    eval(`validateResult = field1Value.valueOf() ${validation.operator} field2Value.valueOf()`);
                    if (!validateResult) {
                        let errorData = {};
                        let errorMessage = ValidationService.getErrorMessage(validation, null, null, group);
                        errorData[validation.name] = {
                            errorMessage: errorMessage
                        };
                        return errorData
                    }
                    return null;
                }
                return null;
            }
            return null;
        };
    }

    static dateCompare(validation: ValidationModel): ValidatorFn {
        return (group: FormGroup): { [key: string]: boolean } | null => {
            if (group) {
                const dateString1 = group.get(validation.field1) ? group.get(validation.field1).value : null;
                const dateString2 = group.get(validation.field2) ? group.get(validation.field2).value : null;
                if (dateString1 && dateString2) {
                    const field1 = new Date(dateString1);
                    const field2 = new Date(dateString2)
                    let validateResult = false;
                    eval(`validateResult = field1.valueOf() ${validation.operator} field2.valueOf()`);
                    if (!validateResult) {
                        let errorData = {};
                        let errorMessage = ValidationService.getErrorMessage(validation, null, null, group);
                        errorData[validation.name] = {
                            errorMessage: errorMessage
                        };
                        return errorData
                    }
                    return null;
                }
                return null;
            }
            return null;
        };
    }

    static validatorFn(validation: ValidationModel, validator: any): ValidatorFn {
        return (control: AbstractControl,): { [key: string]: any } | null => {
            const validationErrors: ValidationErrors = validator(control);
            if (validationErrors) {
                let errorMessage = ValidationService.getErrorMessage(validation, control, validationErrors);
                let errorData = {};
                errorData[validation.name] = {
                    validationErrors,
                    errorMessage: errorMessage
                };
                return errorData
            }
            return null;
        };
    }

    static extensionNoValidator(control: AbstractControl): { [key: string]: boolean } | null {

        var isValid = true;

        if (control.value !== undefined && control.value != null) {

            var extensionNumberList = [];
            const extensionRangeList = control.value.split(",");
            extensionRangeList.forEach(extensionItem => {
                if (extensionItem.includes("-")) {

                    const extenionNoList = extensionItem.split("-");

                    // check if mulltiple '-'
                    if (extenionNoList.length - 1 > 1) { return isValid = false; };

                    let minVal = (extenionNoList[0]);
                    let maxVal = (extenionNoList[1]);

                    // check length shouild be less than 20
                    if (minVal.length > 20) { return isValid = false; };
                    if (maxVal.length > 20) { return isValid = false; };

                    // check if range overlaps
                    for (var i = minVal; i <= maxVal; i++) {
                        if (extensionNumberList.includes(i)) {
                            { return isValid = false; };
                        } else {
                            extensionNumberList.push(i);
                        }
                    }

                    // check if all digits
                    var isAllNum = /^\d+$/
                    if (!isAllNum.test(minVal)) { return isValid = false; };
                    if (!isAllNum.test(maxVal)) { return isValid = false; };

                    // check if starts with '0' or '9'
                    var startsWith = /(^(?:0|9)$)|(^(?:0|9)\d+$)/
                    if (startsWith.test(minVal)) { return isValid = false; };
                    if (startsWith.test(maxVal)) { return isValid = false; };

                    // check if second value smaller than first value
                    minVal = parseInt(minVal);
                    maxVal = parseInt(maxVal);
                    if (minVal > maxVal) { return isValid = false; };

                } else {

                    // check if extension no overlaps
                    if (extensionNumberList.includes(extensionItem)) {
                        { return isValid = false; };
                    } else {
                        extensionNumberList.push(extensionItem);
                    }

                    // check length shouild be less than 20
                    if (extensionItem.length > 20) { return isValid = false; };

                    // check if all digits
                    var isAllNum = /^\d+$/
                    if (!isAllNum.test(extensionItem)) { return isValid = false; };

                    // check if starts with '0' or '9'
                    var startsWith = /(^(?:0|9)$)|(^(?:0|9)\d+$)/
                    if (startsWith.test(extensionItem)) { return isValid = false; };
                }

            });

        }

        if (!isValid) {
            return { 'extensionNoValidator': true };
        } else {
            return null;
        }

    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    getValidations(controlName, validationData) {
        return validationData.find(v => v.controlName === controlName).validations;
    }

    getValidationsFromArray(formarrayName: string, controlName: string, validationData: any[]) {
        return validationData.find(v => v.controlName === formarrayName).controls.find(c => c.controlName == controlName).validations;
    }

    static getErrorMessage(validation: ValidationModel, control: AbstractControl, validationErrors: ValidationErrors, formFroup?: FormGroup) {
        let message = validation.defaultMessage;
        if (validation.message) {
            if (validation.message.value) {
                message = validation.message.value;
            }
            if (!validation.message.isStatic && message && validation.message.dynamicParams) {
                validation.message.dynamicParams.forEach(element => {
                    const regexp = new RegExp(element.field, 'g');
                    let controlValue = '';
                    eval(`controlValue = ${element.value}`);
                    message = message.replace(regexp, controlValue);
                });
            }
        }
        return message;
    }
}
