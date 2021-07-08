export interface IWidgetPermission {
    getReadPermission(control : string);
    getVisiblePermission(control : string): boolean
}