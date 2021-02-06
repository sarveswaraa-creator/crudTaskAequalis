import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TableConfig } from './viewtask.config';
import { ColumnItem, DataItem } from './viewtask.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css'],
})
export class ViewtaskComponent implements OnInit, OnChanges {
  tableConfig: ColumnItem[];
  @Input() sourceData: DataItem[];
  @Input() isVisibleSearchBar: boolean;
  @Output() selectedData = new EventEmitter<DataItem[]>();
  listOfDisplayData: DataItem[];
  indeterminate: boolean;
  isAllChecked: boolean;
  searchValue = '';
  searchVisible = false;
  searchConfig: any;
  startDate: any = new Date();
  statusMapper: {
    todo: { color: string; name: string };
    done: { color: string; name: string };
    inprogress: { color: string; name: string };
  };

  constructor() {
    this.searchConfig = {
      id: null,
      name: { type: 'text' },
      assigneeName: { type: 'text' },
      startDate: { type: 'date', value: '' },
      endDate: { type: 'date', value: '' },
      totalTime: { type: 'text' },
      status: { type: 'text' },
    };
    this.isVisibleSearchBar = false;
    this.tableConfig = TableConfig;
    this.sourceData = [];
    this.listOfDisplayData = [];
    this.indeterminate = false;
    this.isAllChecked = false;
    this.statusMapper = {
      todo: { color: 'red', name: 'To Do' },
      done: { color: 'green', name: 'Done' },
      inprogress: { color: 'blue', name: 'In Progress' },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.sourceData &&
      changes.sourceData.currentValue !== changes.sourceData.previousValue
    ) {
      this.listOfDisplayData = [...changes.sourceData.currentValue];
      this.indeterminate = false;
      this.isAllChecked = false;
    }
  }
  ngOnInit(): void {}

  reset(): void {
    this.searchValue = '';
    this.search('');
  }
  keepOrder = (a: any, b: any) => {
    return a;
  };

  checkTheadBox() {
    this.isAllChecked = this.listOfDisplayData.every(
      ({ isChecked }) => isChecked
    );
    this.indeterminate =
      !this.isAllChecked &&
      this.listOfDisplayData.some(({ isChecked }) => isChecked);
    this.selectedData.emit(
      this.listOfDisplayData.filter(({ isChecked }) => isChecked)
    );
  }
  onItemChecked(userId: number, isCheck: boolean) {
    this.listOfDisplayData.forEach((user) => {
      if (user.id === userId) user.isChecked = isCheck;
    });
    this.checkTheadBox();
  }
  onAllChecked(isCheck: boolean) {
    this.isAllChecked = isCheck;
    this.listOfDisplayData.forEach((user) => {
      user.isChecked = isCheck;
    });
    this.checkTheadBox();
  }
  search(name?: string): void {
    console.log(name, 'name');
    this.searchVisible = false;
    this.listOfDisplayData = this.listOfDisplayData.filter(
      (item: DataItem) => item.name.indexOf(this.searchValue) !== -1
    );
  }
  searchAction(key: string, val: any, type: string) {
    console.log(key, val, type);
    if (val) {
      const searchOfResultData = this.sourceData.filter((user: any) => {
        if (key === 'totalTime') {
          return Number(user[key]) === Number(val);
        } else if (type === 'text' && user[key]) {
          const a = user[key].toLocaleLowerCase();
          const b = val.toLocaleLowerCase();
          return a.includes(b);
        } else {
          console.log(user[key], val);
          return moment(user[key]).format('L') === moment(val).format('L');
        }
        return false;
      });
      this.listOfDisplayData = searchOfResultData
        ? [...searchOfResultData]
        : [...this.sourceData];
    } else {
      this.listOfDisplayData = [...this.sourceData];
    }
  }
  onCurrentPageDataChange(val: any) {}
}
