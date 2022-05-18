import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnChanges {
  modalTitle: String;
  @ViewChild('content') content: ElementRef;
  @Input('isOpen') isModalOpen: Boolean = false;
  @Output('beforeDismiss') beforeDismiss = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.isModalOpen) {
      this.modalService.open(this.content, {
        backdropClass: 'light-blue-backdrop',
        beforeDismiss: () => {
          this.beforeDismiss.emit();
          return true;
        },
      });
    } else {
      this.modalService.dismissAll();
    }
  }

  closeModal() {
    this.modalService.dismissAll();
    this.beforeDismiss.emit();
  }
}
