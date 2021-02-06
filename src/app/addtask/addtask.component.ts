import { animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataItem } from '../viewtask/viewtask.interface';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
})
export class AddtaskComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() actionType: string;
  @Input() editData: DataItem[];
  @Output() modalState = new EventEmitter<any>();
  modalConfig: any;
  assignTaskForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.isVisible = false;
    this.actionType = 'add';
    this.modalConfig = {
      add: { title: 'Add Assign Task' },
      edit: { title: 'Edit Assign Task' },
    };
    this.editData = [];
    this.assignTaskForm = this.fb.group({
      name: [''],
      assigneeName: [''],
      startDate: [''],
      endDate: [''],
      totalTime: [''],
      status: [''],
    });
  }

  handleCancel() {
    this.modalState.emit({ isClose: true, actionType: 'cancel' });
  }

  ngOnInit(): void {
    this.modalConfig = this.modalConfig[this.actionType];
    if (this.actionType === 'edit') {
      this.assignTaskForm.patchValue(this.editData[0]);
    }
  }

  handleOk() {
    const data = this.assignTaskForm?.value;
    if (this.actionType === 'edit') {
      data.id = this.editData[0].id;
    }
    // console.log(this.assignTaskForm.value);
    this.modalState.emit({
      isClose: true,
      actionType: this.actionType,
      data: this.assignTaskForm?.value,
    });
  }
}
