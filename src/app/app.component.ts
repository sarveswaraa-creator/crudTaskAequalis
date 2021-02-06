import { Component } from '@angular/core';
import { DataItem } from './viewtask/viewtask.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'aequalistask';
  buttonConfig: any;
  isVisibleAddEditUser: boolean;
  actionType: string;
  assignTableData: DataItem[];
  selectData: DataItem[];
  isVisibleSearchBar: boolean;
  constructor(private modal: NzModalService) {
    this.isVisibleSearchBar = false;
    this.assignTableData = [
      {
        id: 1,
        name: 'sarveswaraa',
        assigneeName: 'siva',
        startDate: new Date('July 21, 1983 01:15:00'),
        endDate: new Date('July 21, 1983 01:15:00'),
        totalTime: 12,
        status: 'todo',
      },
      {
        id: 2,
        name: 'Brito',
        assigneeName: 'Suzu',
        startDate: new Date('Feb 06, 2021 01:15:00'),
        endDate: new Date('July 21, 1983 01:15:00'),
        totalTime: 12,
        status: 'inprogress',
      },
      {
        id: 3,
        name: 'Ajith',
        assigneeName: 'Ragu',
        startDate: new Date(10, 12, 2010),
        endDate: new Date(10, 12, 2010),
        totalTime: 12,
        status: 'done',
      },
      {
        id: 4,
        name: 'Jeeva',
        assigneeName: 'Arulnethi',
        startDate: new Date(10, 12, 2010),
        endDate: new Date(10, 12, 2010),
        totalTime: 12,
        status: 'done',
      },
      {
        id: 5,
        name: 'Ajantha',
        assigneeName: 'Azhagan',
        startDate: new Date('July 21, 1983 01:15:00'),
        endDate: new Date('July 21, 1983 01:15:00'),
        totalTime: 12,
        status: 'todo',
      },
      {
        id: 6,
        name: 'saravanan',
        assigneeName: 'prakesh',
        startDate: new Date('Feb 06, 2021 01:15:00'),
        endDate: new Date('July 21, 1983 01:15:00'),
        totalTime: 12,
        status: 'inprogress',
      },
      {
        id: 7,
        name: 'Ram',
        assigneeName: 'Raj',
        startDate: new Date(10, 12, 2010),
        endDate: new Date(10, 12, 2010),
        totalTime: 12,
        status: 'done',
      },
      {
        id: 8,
        name: 'sivarajan',
        assigneeName: 'jothi',
        startDate: new Date(10, 12, 2010),
        endDate: new Date(10, 12, 2010),
        totalTime: 12,
        status: 'done',
      },
      {
        id: 9,
        name: 'kumaran',
        assigneeName: 'Nagaraj',
        startDate: new Date('July 21, 1983 01:15:00'),
        endDate: new Date('July 21, 1983 01:15:00'),
        totalTime: 12,
        status: 'todo',
      },
      {
        id: 10,
        name: 'surya',
        assigneeName: 'nagaraj',
        startDate: new Date('Feb 06, 2021 01:15:00'),
        endDate: new Date('July 21, 1983 01:15:00'),
        totalTime: 12,
        status: 'inprogress',
      },
      {
        id: 11,
        name: 'sakthi',
        assigneeName: 'murugan',
        startDate: new Date(10, 12, 2010),
        endDate: new Date(10, 12, 2010),
        totalTime: 12,
        status: 'done',
      },
      {
        id: 12,
        name: 'jaya',
        assigneeName: 'sekar',
        startDate: new Date(10, 12, 2010),
        endDate: new Date(10, 12, 2010),
        totalTime: 12,
        status: 'done',
      },
      {
        id: 13,
        name: 'makesh',
        assigneeName: 'babu',
        startDate: new Date('July 21, 1983 01:15:00'),
        endDate: new Date('July 21, 1983 01:15:00'),
        totalTime: 12,
        status: 'todo',
      }

    ];
    this.buttonConfig = [
      { icon: 'user-add', name: 'add', disabled: false },
      { icon: 'edit', name: 'edit', disabled: false },
      { icon: 'delete', name: 'delete', disabled: false },
    ];
    this.isVisibleAddEditUser = false; //true;
    this.actionType = 'add';
    this.selectData = [];
  }
  action(actionType: string) {
    this.actionType = actionType;
    if (!this.selectData.length && actionType != 'add') {
      this.showSweetAlert();
    } else {
      switch (actionType) {
        case 'add':
          this.isVisibleAddEditUser = true;
          break;
        case 'edit':
          this.isVisibleAddEditUser = true;
          break;
        case 'delete':
          this.showDeleteConfirm();
          break;
      }
    }
  }
  showSweetAlert(): void {
    this.modal.warning({
      nzTitle: 'Please select the task',
    });
  }
  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.selectData.forEach((user) => {
          this.assignTableData.splice(
            this.assignTableData.findIndex(({ id }) => user.id === id),
            1
          );
        });
        this.assignTableData = [...this.assignTableData];
        this.selectData = [];
        this.disabledAction(this.selectData);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
  modalAction({
    isClose = false,
    actionType = '',
    data,
  }: {
    isClose: boolean;
    actionType: string;
    data: DataItem;
  }) {
    if (actionType === 'add') {
      data.id = this.generateId();
      this.assignTableData = [data, ...this.assignTableData];
    } else if (actionType === 'edit') {
      this.assignTableData = this.assignTableData.map((user) => {
        if (user.id === data.id) {
          return data;
        }
        return user;
      });
      this.assignTableData = [...this.assignTableData];
      this.selectData = [];
      this.disabledAction(this.selectData);
    }
    this.isVisibleAddEditUser = !isClose;
  }

  searchAction() {
    this.isVisibleSearchBar = !this.isVisibleSearchBar;
  }
  disabledAction(selectData: DataItem[]) {
    this.buttonConfig.forEach((btn: any) => {
      if (btn.name === 'add') {
        btn.disabled = Boolean(selectData.length);
      } else if (btn.name === 'edit') {
        btn.disabled = Boolean(selectData.length && selectData.length > 1);
      }
    });
    console.log(this.buttonConfig);
  }
  getCheckedData(selectData: DataItem[]) {
    this.selectData = selectData;
    this.disabledAction(selectData);
    console.log(this.selectData, 'this.selectData');
  }
  generateId(min = 1, max = 1000): number {
    const newId = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.assignTableData.some(({ id }) => newId === id)) {
      this.generateId();
    }
    return newId;
  }
}
