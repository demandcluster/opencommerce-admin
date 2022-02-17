import {
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState
} from "react-table";

export interface UseCustomFilterColumnProps<D extends object> {
  filterOptions: {label: string, value: string}[]
  filterLabel: string
}

declare module 'react-table' {
  export interface TableOptions<D extends object>
    extends UseFiltersOptions<D>,
      UsePaginationOptions<D>,
      UseSortByOptions<D> {}

  export interface Hooks<D extends object = {}>
    extends UseSortByHooks<D> {}

  export interface TableInstance<D extends object = {}>
    extends UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D>,
      UseFiltersInstanceProps<D> {
  }

  export interface TableState<D extends object = {} >
    extends UsePaginationState<D>,
      UseSortByState<D>,
      UseFiltersState<D> {
  }

  export interface ColumnInterface<D extends object = {}>
    extends UseFiltersColumnOptions<D>,
      UseSortByColumnOptions<D> {
  }

  export interface ColumnInstance<D extends object = {}>
    extends UseFiltersColumnProps<D>,
      UseSortByColumnProps<D>,
      UseCustomFilterColumnProps<D> {
  }
}

export {};