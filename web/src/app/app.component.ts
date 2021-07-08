import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppRepoService } from './services/common/app-repo.service';
import { StartUpService } from './services/common/startup.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'arai';
  ENVIRONMENT =environment;
  constructor(private _startupService : StartUpService,
    private elementRef:ElementRef,
    private _appRepoService: AppRepoService) { }


  ngOnInit(): void {
    // this._startupService.GetStartUpData().then(() => {
      
    // }).catch(e => { console.log('startup-error : ',e); });
  }

  ngAfterViewInit() {
    if(environment.debugWidget){
      let element =  this.elementRef.nativeElement.querySelector('.root-div-element')
      if(element){
      //element.addEventListener('dblclick', this.onClick.bind(this));
      }  
    }              
  }

  onClick(event:any){
    if(event){
      let targetelement:HTMLElement = event.target; 
      alert($(targetelement.closest("[widget_page_id]")).attr('widget_page_id'));
      
      // let targetelement:HTMLElement = event.target; 
      // let widget_page_id = $(targetelement.closest("[widget_page_id]")).attr('widget_page_id');
      // let page_name = $(targetelement.closest("[page_name]")).attr('page_name');
      // let widget_name = $(targetelement.closest("[widget_page_id]")).attr('widget_name');

      // let desc = `widget_page_id: ${widget_page_id}\n`
      // desc +=  `widget_name: ${widget_name}\n`
      // desc +=  `page_name: ${page_name}`;

      // alert(desc.toString());
    }
  }
}
