import {
  NzTableSortOrder,
  NzTableSortFn,
  NzTableFilterList,
  NzTableFilterFn,
} from 'ng-zorro-antd/table';

export interface DataItem {
  isChecked?: boolean;
  id?: number;
  name: string;
  assigneeName: string;
  startDate: Date;
  endDate: Date;
  totalTime: number;
  status: string;
}
export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  // sortDirections: NzTableSortOrder[];
  filterFn?: NzTableFilterFn | null;
  filterMultiple?: boolean;
  listOfFilter?: NzTableFilterList | undefined;
  searchVisible?: boolean;
}
