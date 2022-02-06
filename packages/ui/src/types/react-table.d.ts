import {
  UsePaginationInstanceProps,
  UsePaginationOptions, UsePaginationState,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState
} from "react-table";

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UsePaginationOptions<D>,
      UseSortByOptions<D> {
  }

  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D> {
  }

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UsePaginationState<D>,
      UseSortByState<D> {
  }
}
