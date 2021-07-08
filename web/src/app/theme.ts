export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    /* Colors */
    "--error-default": "#ef3e36",
    "--error-dark": "#800600",
    "--error-light": "#ffcecc",
    /*defaul*/
    "--text-dark-color": "#141821",
    "--text-normal-color": "#858997",
    "--theme-color": "#417afc",
    "--text-white": "#fff",
    "--text-light-color": "#7C7C7C",
    "--complete-background": "#5351FB",
    "--approve-background": "#00CD98",
    "--gray-backgound": "#929292",
    "--error-background": "#CD3F00",
    "--margin-top-10": "10px",
    "--small-font-size": "12px",
    "--stepper-font-size": "13px",
    "--normal-font-size": "14px",
    "--login-font-size": "16px",
    "--icon-size": "20px",
    "--header-font-size": "24px",
    "--jumbotron-background": "#F8F9FA",
    "--mat-background": "#fff",
    "--box-shadow": "0px 10px 30px #D1D5DF80",
    "--border-radius": "20px",
    "--sidebar-radius": "27px",
    "--font-bold": "700",
    "--font-normal": "400",
    "--font-light": "200",
    "--body-background": "#5c5c610f",
    "--side-nav-bar-bg-color": "#598cff",
    "--mat-cell-color": "rgba(0, 0, 0, .87)",

    /* Timeline  */
    "--badge-todo": "#bbb7b7",
    "--badge-icon-in-progress": "#ba1f1f",
    "--timeline-bar-bg-color": "#c2bebe",
    /*stepper*/
    "--visited-node": "#3B8004",
    "--default-node": "#808080",
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
       /* Colors */
       "--error-default": "#ef3e36",
       "--error-dark": "#800600",
       "--error-light": "#ffcecc",
       /*defaul*/
       "--text-dark-color": "#fff",
       "--text-normal-color": "#fff",
       "--theme-color": "#417afc",
       "--text-white": "#fff",
       "--text-header-color": "#fff",
       "--text-light-color": "#7C7C7C",
       "--complete-background": "#5351FB",
       "--approve-background": "#00CD98",
       "--gray-backgound": "#929292",
       "--error-background": "#CD3F00",
       "--margin-top-10": "10px",
       "--small-font-size": "12px",
       "--stepper-font-size": "13px",
       "--normal-font-size": "14px",
       "--login-font-size": "16px",
       "--icon-size": "20px",
       "--header-font-size": "24px",
       "--jumbotron-background": "#F8F9FA",
       "--mat-background": "#333",
       "--box-shadow": "0px 10px 30px #D1D5DF80",
       "--border-radius": "20px",
       "--sidebar-radius": "27px",
       "--font-bold": "700",
       "--font-normal": "400",
       "--font-light": "200",
       "--body-background": "#5c5c610f",
       "--side-nav-bar-bg-color": "#598cff",
    "--mat-cell-color": "rgba(255, 255, 255, .87)",
       /* Timeline  */
       "--badge-todo": "#bbb7b7",
       "--badge-icon-in-progress": "#ba1f1f",
       "--timeline-bar-bg-color": "#c2bebe",
       /*stepper*/
       "--visited-node": "#3B8004",
       "--default-node": "#808080",
  }
};

