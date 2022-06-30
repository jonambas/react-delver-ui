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
import { TextField } from '@src/components/textfield';
import { Search } from '@src/components/icons';
import { Select } from '@src/components/select';

const fromOptions = data
  .filter(({ from }) => from !== 'indeterminate')
  .map(({ from }) => ({ value: from, text: from }));

const table = createTable()
  .setRowType<Row>()
  .setOptions({
    enableFilters: true,
    enableColumnFilters: true,
    filterFns: {
      global: (row, columnId, values = {}, addMeta) => {
        const { search, from } = values;
        let show = true;

        if (!filterFns.includesString(row, columnId, search, addMeta)) {
          show = false;
        }
        // console.log();
        if (from && row.getValue('from') !== from) {
          show = false;
        }
        return show;
      }
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
  const [global, setGlobal] = React.useState({ search: '', from: '' });
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
    // onGlobalFilterChange: setGlobal,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const noResults = instance.getFilteredRowModel().rows.length === 0;

  return (
    <>
      <Box mb="200">
        <Box display="flex">
          <Box mr="300" flex="1">
            <TextField
              icon={<Search />}
              value={global.search}
              onChange={(e) =>
                setGlobal({ search: e.currentTarget.value, from: global.from })
              }
              placeholder="Search..."
              type="text"
            />
          </Box>
          <div>
            <Select
              value={global.from}
              onValueChange={(v) =>
                setGlobal({ from: v, search: global.search })
              }
              options={fromOptions}
            />
          </div>
        </Box>
      </Box>

      <Box fontSize="200" mb="600" color="gray.500">
        Showing {instance.getFilteredRowModel().rows.length} of{' '}
        {instance.getCoreRowModel().rows.length} components
      </Box>
      {noResults ? (
        <Box fontSize="300" py="200" textAlign="center">
          No Results
        </Box>
      ) : (
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
        </>
      )}
    </>
  );
};
