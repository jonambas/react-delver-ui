import React from 'react';
import { Box } from '@sweatpants/box';
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  PaginationState,
  filterFns
} from '@tanstack/react-table';
import data, { Row } from '__delverData';

import { Button } from '@src/components/button';
import { Thr, Tr } from '@src/components/tableComponents';
import {
  NameHeaderCell,
  NameCell,
  InstancesHeaderCell,
  InstancesCell,
  FromHeaderCell,
  FromCell
} from '@src/components/cells';

const table = createTable()
  .setRowType<Row>()
  .setOptions({
    enableFilters: true,
    enableColumnFilters: true,
    filterFns: {
      global: filterFns.includesString
    }
  });

const columns = [
  table.createDataColumn('name', {
    header: NameHeaderCell,
    cell: NameCell,
    filterFn: 'global'
  }),
  table.createDataColumn('from', {
    header: FromHeaderCell,
    cell: FromCell,
    filterFn: 'global'
  }),
  table.createDataColumn('count', {
    header: InstancesHeaderCell,
    cell: InstancesCell
  })
];

export const Table = () => {
  const [global, setGlobal] = React.useState('');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      pagination,
      globalFilter: global
    },
    globalFilterFn: 'global',
    onGlobalFilterChange: setGlobal,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <>
      <input
        value={global}
        onChange={(e) => setGlobal(e.currentTarget.value)}
        placeholder="Search..."
        type="text"
      />
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
      <Box my="200" display="flex" justifyContent="space-between">
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
      {/* <div>{instance.getRowModel().rows.length} Rows</div> */}
    </>
  );
};
