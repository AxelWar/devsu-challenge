import { Injectable, ComponentRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogComponentRef!: ComponentRef<ConfirmDialogComponent>;

  open(viewContainerRef: ViewContainerRef, message?: string): Promise<boolean> {
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(
      ConfirmDialogComponent
    );
    if (message) {
      componentRef.instance.message = message;
    }

    this.dialogComponentRef = componentRef;

    return new Promise<boolean>(resolve => {
      this.dialogComponentRef.instance.confirm.subscribe((result: boolean) => {
        this.close(viewContainerRef);
        resolve(result);
      });
    });
  }

  close(viewContainerRef: ViewContainerRef) {
    viewContainerRef.clear();
  }
}
