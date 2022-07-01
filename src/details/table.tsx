import React, { FC } from 'react';
import type { Instance } from 'react-delver';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  Cell,
  ColumnDef
} from '@tanstack/react-table';
import { Box } from '@sweatpants/box';
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

import { RowExpandContext, RowExpandContextProvider } from './expandContext';

const columns: ColumnDef<Instance>[] = [
  {
    accessorKey: 'location',
    accessorFn: (instance) => instance.location.file,
    header: HeaderCell,
    cell: LocationCell
  },
  {
    accessorKey: 'from',
    header: HeaderCell,
    cell: FromCell
  },
  {
    accessorKey: 'spread',
    header: HeaderCell,
    cell: SpreadCell
  },
  {
    accessorKey: 'props',
    header: HeaderCell,
    cell: PropsCell
  },
  {
    accessorKey: 'props',
    id: 'actions',
    header: null,
    enableSorting: false,
    cell: (p) => <ActionCell data={p.row.getValue('props')} />
  }
];

export const Table: FC<{ instances: Array<Instance> }> = (props) => {
  const { instances } = props;

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'location', desc: true }
  ]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });

  const instance = useReactTable({
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
            const canExpand = row.getValue('props').length;
            return (
              <RowExpandContextProvider key={row.id}>
                <TrWithContext
                  cells={row.getVisibleCells()}
                  canExpand={canExpand}
                />
              </RowExpandContextProvider>
            );
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

type TrWithContextProps = {
  cells: Cell<any>[];
  canExpand: boolean;
};

const TrWithContext: FC<TrWithContextProps> = (props) => {
  const { expand, toggle } = React.useContext(RowExpandContext);
  const onClick = props.canExpand ? () => toggle(!expand) : undefined;
  return <Tr cells={props.cells} onClick={onClick} />;
};
