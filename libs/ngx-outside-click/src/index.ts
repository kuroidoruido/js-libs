import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { listenOutsideClick } from '@anthonypena/outside-click';

@Directive({
  selector: '[ngxOutsideClick]',
  standalone: true,
})
export class NgxOutsideClickDirective implements OnInit, OnDestroy {
  @Output() ngxOutsideClick = new EventEmitter<MouseEvent>();
  private elementRef = inject(ElementRef);
  private clearListener: VoidFunction | undefined;

  ngOnInit() {
    this.clearListener = listenOutsideClick(
      this.elementRef.nativeElement,
      (event) => this.ngxOutsideClick.emit(event),
    );
  }

  ngOnDestroy() {
    this.clearListener?.();
  }
}
