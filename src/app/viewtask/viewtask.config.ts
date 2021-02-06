import { ColumnItem, DataItem } from './viewtask.interface';

export const TableConfig: ColumnItem[] = [
  {
    name: 'Name',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    searchVisible: false,
  },
  {
    name: 'Assignee Name',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) =>
      a.assigneeName.localeCompare(b.assigneeName),
    searchVisible: false,
  },
  {
    name: 'Start Date',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem): any =>
      new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf(),
  },
  {
    name: 'End Date',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem): any =>
      new Date(a.endDate).valueOf() - new Date(b.endDate).valueOf(),
  },
  {
    name: 'Total Time',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) => a.totalTime - b.totalTime,
  },
  {
    name: 'Status',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status),
    filterMultiple: true,
    listOfFilter: [
      { text: 'To Do', value: 'todo' },
      { text: 'Done', value: 'done' },
      { text: 'In Progress', value: 'inprogress' },
    ],
    filterFn: (list: string[], item: DataItem) =>
      list.some((status) => item.status.indexOf(status) !== -1),
  },
];
