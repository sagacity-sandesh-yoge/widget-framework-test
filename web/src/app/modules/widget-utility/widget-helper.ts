import { WidgetPermissionConst } from './widget-constants';
import { Subject, Observable } from 'rxjs';

export class WidgetHelper {

  static getReadPermissions(controlName: string, permissions, mode: string, widget) {
    if (permissions) {
      if (permissions[mode][controlName] === WidgetPermissionConst.READ_ONLY) {
        widget.get(controlName).disable();
      } else if (permissions[mode][controlName] === WidgetPermissionConst.READ_WRITE) {
        widget.get(controlName).enable();
      }
    }
    else {
      widget.get(controlName).enable();
    }
  }

  static getVisiblePermissions(controlName: string, permissions, mode: string) {
    if (permissions) {
      if(!permissions[mode]){
        return false;
      }
      if (permissions[mode][controlName] === WidgetPermissionConst.HIDDEN) {
        return false;
      } 
      else if (permissions[mode][controlName] === WidgetPermissionConst.READ_WRITE) {
        return true;
      } 
      else {
        return false;
      }
    } else {
      return false;
    }
  }

  static setGlobalParamsInFormData(dataModel, formData) {
    if (dataModel.isGlobalParams) {
      dataModel.globalParamterKeys.forEach(item => {
        formData[item] = dataModel.globalParameters.get(item);
      })
    }
  }

  static getLabelShortHelpText(dataModel: any, name: any) {
    if (dataModel.tooltip[name]) {
      return dataModel.tooltip[name].hovertext
    }
    return null;
  }

  static getIconDetailsHelpText(dataModel: any, name: string) {
    if (dataModel.tooltip[name]) {
      return dataModel.tooltip[name].icontext
    }
    return null;
  }

  static hasHelpIcon(dataModel: any, name: string) {
    if (dataModel.tooltip[name]) {
      return dataModel.tooltip[name].isicon
    }
    return false;
  }

}