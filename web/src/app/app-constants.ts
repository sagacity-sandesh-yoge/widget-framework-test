import { EVENT_NAME as DB_EVENT_NAME } from "./constants/db.constants";

export enum SESSION_STORAGE_DATA_KEY {
  USERINFO = "userinfo",
  SESSION_TOKEN = "sessionToken",
  NAVIGATION_DATA = "PAGE_NAVIGATION_DATA",
}

export enum LOCAL_STORAGE_DATA_KEY {
  USERINFO = "userinfo",
  SESSION_TOKEN = "sessionToken",
}

export enum EVENT_NAME {
  ON_ITEM_CLICK = DB_EVENT_NAME.ON_ITEM_CLICK,
  ON_SUBMIT = DB_EVENT_NAME.ON_SUBMIT,
  ON_ADD_CLICK = DB_EVENT_NAME.ON_ADD_CLICK,
  ON_UPLOAD_CLICK = DB_EVENT_NAME.ON_UPLOAD_CLICK,
  ON_DOWNLOAD_ALL_CLICK = DB_EVENT_NAME.ON_DOWNLOAD_ALL_CLICK,
  ON_EXPORT_CLICK = DB_EVENT_NAME.ON_EXPORT_CLICK,
  ON_SYNC_CLICK = DB_EVENT_NAME.ON_SYNC_CLICK,
  ON_EMAIL_CLICK = DB_EVENT_NAME.ON_EMAIL_CLICK,
  ON_CANCEL = DB_EVENT_NAME.ON_CANCEL,
  ON_FILTER_APPLY = DB_EVENT_NAME.ON_FILTER_APPLY,
  ON_FILTER_RESET = DB_EVENT_NAME.ON_FILTER_RESET
}

export class WIDGET_LIBRARY {
  public static readonly CONST_VERTICAL_MENU = "vertical-menu";

  public static readonly CONST_BAR_CHART_A4_NAME = "bar-chart-a4";
  public static readonly CONST_BAR_CHART_A5_NAME = "bar-chart-a5";
  public static readonly CONST_PIE_CHART_A2_NAME = "pie-chart-a2";
  public static readonly CONST_PIE_CHART_A3_NAME = "pie-chart-a3";
  public static readonly CONST_LINE_CHART_A2_NAME = "line-chart-a2";
  public static readonly CONST_PROGRESS_BAR_A2_NAME = "progress-bar-a2";

  public static readonly CONST_BAR_LINE_COMBO_CHART_A1_NAME =
    "bar-line-combo-chart-a1";
  public static readonly CONST_PIE_GRID_A1_NAME = "pie-grid-a1";
  public static readonly CONST_PROGRESS_BAR_A1_NAME = "progress-bar-a1";
  public static readonly CONST_AREA_CHART_A1_NAME = "area-chart-a1";
  public static readonly CONST_MATRIX_A1_NAME = "matrix-a1";
  public static readonly CONST_TABLE_A1_NAME = "table-a1";
  public static readonly CONST_STEPPER_A1_NAME = "stepper-a1";
  public static readonly CONST_STAT_REPORT_A1_NAME = "stat-report-a1";
  public static readonly CONST_Mat_B_A1 = "mat-b-a1";
  public static readonly CONST_Billing_Form_A1 = "billing-form-a1";
  public static readonly CONST_BUTTON_A1_NAME = "button-a1";
  public static readonly CONST_DATA_FORM_NAME = "data-form";
  public static readonly CONST_ADD_BUTTON = "add-button";
  public static readonly CONST_VERTICAL_TIMELINE = "vertical-timeline";
  public static readonly CONST_NAVIGATION = "navigation";
  public static readonly CONST_FILE_EXPLORER = "file-explorer";
  public static readonly CONST_FILE_UPLOAD = "file-upload";
  public static readonly CONST_NEW_REGISTRATION = "auth-registration";
  public static readonly CONST_REGISTRATION_FORM = "registration-form";
  public static readonly CONST_CONTACT_FORM = "contact-form";
  public static readonly CONST_TAX_FORM = "tax-form";
  public static readonly CONST_ORGANIZATION_FORM = "organization-form";
  public static readonly CONST_ACCOUNT_DEPT_FORM = "account-dept-form";
  public static readonly CONST_BANK_FORM = "bank-form";
  public static readonly CONST_GST_FORM = "gst-form";
  public static readonly CONST_CONTINUE_REG_FORM = "continue-registration";
  public static readonly CONST_DROPDOWN_A1 = "dropdown-a1";
  public static readonly CONST_DOCUMENT_VERIFICATION = "document-verification";
  public static readonly CONST_MODEL_SELECTION = "model-selection";

  public static readonly CONST_DRAG_DROP = "drag-drop";
  public static readonly CONST_TABLE_A2 = "table-a2";
  public static readonly CONST_CASE_INFORMATION = "cr-case-information";
  public static readonly CONST_CR_SELECT_CERTIFICATE = "cr-select-certificate";
  public static readonly CONST_HORIZONTAL_STEPPER = "horizontal-stepper";
  public static readonly CONST_SELECT_COMPANY= "cr-select-company";

  public static readonly CONST_CR_ADD_BILLING = "cr-add-billing-form";
  public static readonly CONST_CR_ADD_BILLING_MANU_DETAILS =
    "cr-add-billing-manufacture-details";
  public static readonly CONST_CR_ADD_SHIPPING_FORM = "cr-add-shipping-form";
  public static readonly CONST_BUTTON_A2 = "button-a2";
  public static readonly CONST_CR_ADD_CASE_CO_ORD_FORM =
    "cr-add-case-co-ord-form";
  public static readonly CONST_CASE_LIST_REGISTRATION =
    "case-list-registration";
  public static readonly CONST_CASE_LIST_DETAILS = "case-list-details";
  public static readonly CONST_UPLOAD_DOC_EXCEL_TABLES =
    "cr-upload-doc-excel-tables";
    public static readonly CONST_CV_TABLE89 =
    "cv-table8-table9";
  public static readonly CONST_UPLOAD_FORM = "upload-form";
  public static readonly CONST_DROPDOWN_A2 = "dropdown-a2";
  public static readonly CONST_CONFIRMATION_TEXT = "confirmation-text";
  public static readonly CONST_NEW_REGISTRATION_FORM2 =
    "new-registration-form2";
  public static readonly CONST_QUOTATION_SEARCH = "quotation-search";
  public static readonly CONST_CASE_SEARCH = "case-search";
  public static readonly CONST_MY_CASE_FILTER = "my-case-tab-filter";
  public static CONST_NEW_CASE_TAB_FILTER ="new-case-tab-filter";
  public static readonly CONST_ADD_SHIPPING_SEARCH = "shipping-search";
  public static readonly CONST_MAT_TAB = "mat-tab";
  public static readonly CONST_MAT_TAB_A1 = "mat-tab-a1";
  public static readonly CONST_CASE_CO_ORD_SEARCH = "cr-case-co-ord-search";
  public static readonly CONST_CASE_VIEW_FORM = "cv-form";

  //user widgets
  public static readonly CONST_USER_ADD = "user-add";
  public static readonly CONST_USER_FILTER = "user-filter";
  public static readonly CONST_CHANGE_PASSWORD = "user-change-pass";

  //company widgets
  public static readonly CONST_COMPANY_FILTER = "company-filter";

  public static readonly CONST_COMP_REG_CONFIRMATION = "comp-reg-confirmation";
  public static readonly CONST_COMPANY_APPROVE = "company-approve-form";
  public static readonly CONST_COMPANY_REJECT = "company-reject-form";

  //alerts
  public static readonly CONST_CASE_ALERTS_FILTER = "alerts-filter";
  public static readonly ALERTS_VIEW_FORM = "alerts-view-form";
  public static readonly ALL_CASES_ALERTS_FILTER = "all-cases-alerts-filter";

  //query
  public static readonly CONST_CASE_QUERY_FILTER = "query-filter";
  public static readonly CONST_CASE_QUERY_FORM = "query-form";

  //remark
  public static readonly CONST_CASE_REMARK_FILTER = "remark-filter";
  public static readonly CONST_CASE_ADD_REMARK_FORM = "add-remark-form";

  //dept
  public static readonly CONST_CV_DEPT_FILTER = "cv-dept-filter";
  public static readonly CONST_DEPT_VIEW_FORM = "dept-view-form";
  public static readonly CONST_DEPT_ALLOCATE = "cv-dept-allocate";
  public static readonly CONST_DEPT_SCHEDULE = "cv-dept-schedule";

  //editor
  public static readonly CONST_TINY_MCE_EDITOR = "tiny-mce-editor";
  public static readonly CONST_CK_EDITOR = "ck-editor";

  //case view documents
  public static readonly CONST_CASE_DOCUMENTS_FILTER = "documents-filter";
  public static readonly CONST_CASE_DOC_HISTORY_FILTER = "doc-history-filter";
  public static readonly CONST_CASE_DOC_HISTORY_DETAILS = "doc-history-details";
  public static readonly CASE_DOC_TABLE_A2 = "document-table-a2";

  //footer org details
  public static readonly CONST_DYANAMIC_TEXT = "cr-dyanamic-text";

  //Add Billling/Shipping Add New Address
  public static readonly CR_ADD_NEW_ADDRESS = "cr-add-new-address";
  //Add Coordinator
  public static readonly CR_ADD_NEW_CO_ORDINATOR = "cr-add-new-co-ordinator";

  //invoice
  static CONST_INVOICE_SEARCH = "invoice-search";

  //storage-repo
  public static STORAGE_REPO_FILTER = "storage-repo-filter";
  //reset-pass-form
  public static readonly RESET_USER_PASSWORD = "reset-pass-form";

  //case-view-info
  public static readonly CASE_VIEW_INFO = "case-view-info";

  //data-templates
  public static DATA_TEMPLATES_FILTER = "data-templates-filter";

  //case
  public static readonly CASE_ASSIGN_FC_FORM = "case-assign-fc-form";

  //case-approve-basic-info
  public static CONST_CASE_APPROVE_BASIC_INFO = "case-approve-basic-info";
  public static CONST_CASE_APPROVE_EDIT_FORM = "case-approve-edit-form";

  //mat-tab-a2
  public static CONST_MAT_TAB_A2 ="mat-tab-a2";

  //quotation - invoice upload form
  public static readonly QUOTATION_INVOICE_UPLOAD_FORM = "quotation-invoice-upload";

  public static CONST_REQUEST_NOTES_FORM = "request-notes-form";
  public static CONST_REQUEST_NOTES_FORM2= "request-notes-form2";
  public static CLEARANCE_NOTE_FORM = "clearance-note-form";
  public static CLEARANCE_NOTE_TABLE = "clearance-note-table";
 public static CLEARANCE_NOTE_DROPDOWN = "clearance-note-dropdown";

  //reports
  public static readonly CASE_REPORTS_FILTER = "reports-filter";
  public static readonly CASE_REPORTS_UPLOAD = "report-upload";

 public static CASE_REG_BTN = "case-reg-btn";

  //case engineers
  public static readonly CASE_ENGINEERS_FILTER = "case-engineers-filter";

  // case actions
  public static readonly CONST_CASE_ACTION_BTN = "case-action-button";

  //tagging
  public static SELECT_TAGGING ="select-tagging";
  static TAGGING_FORM = "tagging-form";
  //clearance
  static CONST_CLARANCE_FILTER = "clearance-filter";
  //cv-case-checklist
   static CONST_CV_CASE_CHECK = "cv-case-checklist";
   

  //case engineers
  public static readonly CASE_CERTIFIACTE_HANDLER_FILTER = "case-certificate-handler-filter";

  //forgot password
  public static readonly FORGOT_PASS_USR_NAME_FORM = "forgot-pass-username-form";


  public static readonly MORE_INFO_LINK_FORM = "more-info-link-form";
  public static SYNC_INFO_FORM = "sync-info-form";
  public static ADD_BTN_COMP_REG_DOC_UPLOAD = "add-btn-comp-reg-doc-upload" ;

  public static  readonly CSP_SEARCH = "csp-search" ;

  public static  readonly CSP_INFO = "csp-info" ;
  public static ADD_BTN_ADD_ENGINEER= "add-btn-add-engineer" ;
  public static SHORT_CLOSE_REMARK = "short-close-remark";
  public static SHORT_CLOSE_VIEW_INFO = "short-close-view-info";

  public static  readonly CASE_STATUS_CARD_GROUP = "case-status-card-group" ;
  public static  readonly DEPT_CASE_CARD_GROUP = "dept-case-card-group" ;
  public static  readonly CASE_TYPE_CARD_GROUP = "case-type-card-group" ;
  public static  readonly FINANCE_CARD = "finance-card" ;
  public static  readonly DASH_CHART_FILTER_A1 = "dash-chart-filter-a1" ;
  public static  readonly CASE_STATUS_CARD_GROUP_A2 = "case-status-card-group-a2" ;
  public static  readonly CASE_STATUS_CARD_GROUP_A3 = "case-status-card-group-a3" ;


  public static  readonly TABLE_ACTION_BTN = "table-action-btn" ;
  public static readonly CONST_ACCORDION_A1 = "accordion-a1";

  public static readonly LINE_CHART_DROPDOWN_A1 = "line-chart-dropdown-a1";
  public static readonly LINE_CHART_DROPDOWN_A2 = "line-chart-dropdown-a2";
  public static readonly BAR_CHART_DROPDOWN_A1 = "bar-chart-dropdown-a1";
  public static readonly STACKED_BAR_CHART_A1 = "stacked-bar-chart-a1";
  public static  readonly DISPATCH_SEARCH = "dispatch-search" ;
  public static  readonly DISPATCH_INFO = "dispatch-info" ;
    public static readonly ADD_DISPATCH_FORM = "add-dispatch-form";

    public static readonly CASE_TEST_STOP_FORM = "case-test-stop-form";
    //query-view-info
    public static readonly QUERY_VIEW_INFO = "query-view-info";
  public static readonly CONST_CASE_QUERY_REPLY = "query-reply";
 
;
  public static readonly QUERY_RESPONSE_INFO = "query-response-info";
  
  public static CONST_REQUEST_NOTE_ACTION_BTN = "request-note-action-btns";

  public static TAG_FILTER = "tag-filter";

  public static MIS_REPORT_FILTER = "mis-report-filter";
  public static DYNAMIC_TABLE = "dynamic-table";
  public static MIS_REPORTS_DETAILS = "mis-report-details";
  public static MIS_REPORT_ACTION_BUTTON = "mis-report-action-button";

  public static DYNAMIC_FILTER = "dynamic-filter";
  static DOCUMENT_VIEWER = "document-viewer";
  public static readonly COMPANY_LIST_BTN_A1 = "company-list-btn-a1";
  public static readonly COMPANY_FORM_A1 = "company-form-a1";

}

export enum DISPATCH_TRANSPORT {
  COURIER = "COURIER",
  POST = "POST",
  CUSTOMER_COLLECTED = "CUSTOMER_COLLECTED",
  ARAI_HAND_DELIVERED = "ARAI_HAND_DELIVERED"
}
