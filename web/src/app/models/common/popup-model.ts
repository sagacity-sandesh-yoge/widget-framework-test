export class PopupModel {
    visible: boolean;
    baseZIndex: number = 500;
    width: string = '800px'
    minWidth: string = '50%';
    textAlign: string = 'left';
    fontSize: string = '15px';
    maximizable: boolean = true
    minY: number = 100;
    header: string;
    responsive: boolean = true;
}