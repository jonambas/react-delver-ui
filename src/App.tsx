import React from 'react';
import { Box } from '@sweatpants/box';
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  PaginationState
} from '@tanstack/react-table';
import data, { Row } from '__delverData';

import { Theme } from './components/theme';
import { Button } from './components/button';
import { Thr, Tr } from './components/tableComponents';
import {
  NameHeaderCell,
  NameCell,
  InstancesHeaderCell,
  InstancesCell,
  FromHeaderCell,
  FromCell
} from './components/cells';

const config = __delverConfig;

const table = createTable().setRowType<Row>();
const columns = [
  table.createDataColumn('name', {
    header: NameHeaderCell,
    cell: NameCell
  }),
  table.createDataColumn('from', {
    header: FromHeaderCell,
    cell: FromCell
  }),
  table.createDataColumn('count', {
    header: InstancesHeaderCell,
    cell: InstancesCell
  })
];

const Table = () => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1
  });

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <>
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

export const App = () => {
  return (
    <Theme>
      <Box as="main" mx="auto" my="800" width="80%" maxWidth="700px">
        <Box as="h1" fontSize="500" mb="600">
          {config.title}
        </Box>
        <Table />
      </Box>
    </Theme>
  );
};
