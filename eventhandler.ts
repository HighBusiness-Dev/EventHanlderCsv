module com.extensions.qadextensions.EventHandler.Testeimport3.ComExtensionsQadextensions.Maint_PRIMARY {
  "use strict";

  import QraViewTSHandlerWithViewFormTSHandler = Qad.QraView.TSHandler.QraViewTSHandlerWithViewFormTSHandler;
  import QraViewFormTSHandlerV2 = Qad.QraView.TSHandler.QraViewFormTSHandlerV2;
  import IViewField = Qad.QraView.TSHandler.IViewField;
  import DTO = com.extensions.qadextensions.EventHandler.Testeimport3.DTO;
  import Teste = com.extensions.qadextensions.EventHandler.Testeimport3.DTO.Testeimport3Maint;
  import Constants = com.extensions.qadextensions.EventHandler.Testeimport3.Constants;


  type parseDto = {
      Codigo: string;
      ItemCodigo: string;
      Item: string;
  }

  /**
   * Testeimport3MaintHandler : Maint TS handler class. 
   * 
   * Do not change this class name or the event handler will no longer run.
   *
   */
  export class Testeimport3MaintHandler extends QraViewTSHandlerWithViewFormTSHandler<DTO.Testeimport3Maint, Testeimport3FormHandler> {
      protected createViewFormTSHandler(): Testeimport3FormHandler {
          return new Testeimport3FormHandler(this);
      }
  }

  export class Testeimport3FormHandler extends QraViewFormTSHandlerV2<DTO.Testeimport3Maint> {
      onButtonClick(viewButton: Qad.QraView.TSHandler.IViewButton, eventData: EventData.QraView.ButtonClickEventData): void {
          if (eventData.buttonId === 'ButoonUpload') {
              this.handleFileUpload(eventData)
          }
      }


      private handleFileUpload(eventData: EventData.QraView.ButtonClickEventData): void {
          const inputElement = document.createElement('input');
          inputElement.type = 'file';
          inputElement.accept = '.csv';
          inputElement.onchange = (e: Event) => {
              const target = e.target as HTMLInputElement;
              if (target && target.files && target.files.length > 0) {
                  const file = target.files[0];
                  const fr = new FileReader()
                  fr.readAsText(file, 'UTF-8')
                  fr.onload = () => {
                      const csvContent = fr.result as string;

                      const parsedData: parseDto[] = this.parseCSV(csvContent)
                      // let url = "api/bdoc/extensions/qadextensions/Testeimport3"

                      // let result = this.ViewController.doHttpGet(url, (data: Qad.Common.DTO.DataResult, status, headers, config) => {
                      //     this.ViewController.getViewField(Constants.FieldNames.Testeimport3_descriptionAutoField1).Value = parsedData[0].Item
                      // })
                      // console.log(result)
                      // let desc = this.ViewController.getViewField(Constants.FieldNames.Testeimport3_descriptionAutoField1)
                      // desc.Value = "teste"

                      // console.log(desc.Value)
                      
                      // this.ViewController.getViewField(Constants.FieldNames.Testeimport3_descriptionAutoField1).Value = parsedData[0].Item

                      // console.log(this.NgData.testeimport_mstrs[0].domainCode)

                      // parsedData.forEach((e, i) => {
                            
                      // })

                      console.log(parsedData)
                      // console.log(parsedData[0].Item)
                      // console.log(this.NgData.testeimport_mstrs[1].description = parsedData[0].Item)
     
                  }   
              }
          }
          inputElement.click()
      }

      private parseCSV(csvContent: string): any[] {
          const rows = csvContent.split('\n');
          const headers = rows[0].split(';');

          const data = rows.slice(1).map( row => {
              const values = row.split(';');
              const obj: any = {};
              headers.forEach((header, index) => {
                  obj[header.trim()] = values[index] ? values[index].trim() : '';
              })
              return obj
          })
          return data;
      }
  }
}