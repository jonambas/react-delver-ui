import React, { FC } from 'react';
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  filterFns,
  SortingState
} from '@tanstack/react-table';
import { Box } from '@sweatpants/box';
import { Row } from '__delverData';
import { Button } from '@src/components/button';
import { Thr, Tr } from '@src/components/tableComponents';
import {
  FromCell,
  HeaderCell,
  SpreadCell,
  LocationCell,
  PropsCell,
  ActionCell
} from '@src/components/cells';

type RowType<T> = T extends Array<infer Single> ? Single : never;

type Instance = RowType<Row['instances']>;

const table = createTable().setRowType<Instance>();

const columns = [
  table.createDataColumn((r) => r.location.file, {
    id: 'location',
    header: (p) => <HeaderCell id={p.header.id} />,
    cell: LocationCell
  }),
  table.createDataColumn('from', {
    header: (p) => <HeaderCell id={p.header.id} />,
    cell: FromCell
  }),
  table.createDataColumn('props', {
    id: 'props',
    header: (p) => <HeaderCell id={p.header.id} />,
    cell: PropsCell
  }),
  table.createDataColumn('spread', {
    header: (p) => <HeaderCell id={p.header.id} />,
    cell: SpreadCell
  }),
  table.createDataColumn('props', {
    id: 'actions',
    header: null,
    enableSorting: false,
    cell: (p) => <ActionCell data={p.row.getValue('props')} />
  })
];

export const Table: FC<{ instances: Row['instances'] }> = (props) => {
  const { instances } = props;

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'location', desc: true }
  ]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });

  const instance = useTableInstance(table, {
    data: instances,
    columns,
    state: {
      pagination,
      sorting
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <Box>
      <Box
        as="table"
        width="100%"
        style={{
          borderCollapse: 'collapse'
        }}
        ml="-0.5rem"
      >
        <thead>
          {instance.getHeaderGroups().map((group) => {
            return <Thr key={group.id} headers={group.headers}></Thr>;
          })}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => {
            return <Tr key={row.id} cells={row.getVisibleCells()} />;
          })}
        </tbody>
      </Box>
      <Box my="200" display="flex" justifyContent="space-between" pr="200">
        <Box fontSize="200" my="200">
          Page {pagination.pageIndex + 1} of {instance.getPageCount()}
        </Box>
        <div>
          <Button
            onClick={() => instance.previousPage()}
            disabled={!instance.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            onClick={() => instance.nextPage()}
            disabled={!instance.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </Box>
    </Box>
  );
};
