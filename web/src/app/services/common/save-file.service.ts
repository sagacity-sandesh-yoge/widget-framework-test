import { ElementRef, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
// import * as FileSaver from 'file-saver';

import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {

  constructor() { }

  saveFile(data: Blob, filename: string) {
    // const blob = new Blob([data], {type: data.type});
    const url = window.URL.createObjectURL(data);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);   // added into dom
    anchor.click();
    anchor.remove();   // removed from dom
  }


  saveZipFile(data: any, filename: string) {
    const blob = new Blob([data], {
      type: 'application/zip'
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);   // added into dom
    anchor.click();
    anchor.remove();   // removed from dom
  }

  openFileInNewTab(data) {
    var newWindow = window.open();
    newWindow.document.write(data);
  }

  saveExcelFile(excelData: any, fileName: string) {
    let contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const byteCharacters = atob(excelData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    this.saveFile(blob, fileName);
  }

  saveZipFileV2(zipData: any, fileName: string) {
    let contentType = 'application/zip';
    // const byteCharacters = atob(zipData);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    // const blob = new Blob([byteArray], { type: contentType });
    let blob = this.b64toBlob(zipData,contentType, null)
    this.saveFile(blob, fileName+'.zip');
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512; // sliceSize represent the bytes to be process in each batch(loop), 512 bytes seems to be the ideal slice size for the performance wise 

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  
  downloadDocFile(path)
  {
    window.open('assets/documents/CMVR_TAS_User_Manual.pdf', '_blank');
    // let link = document.createElement('a');
    // link.setAttribute('type', 'file');
    // link.href = 'assets/documents';
    // link.download = path;
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
  }

}
