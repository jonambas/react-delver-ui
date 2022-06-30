import React, { FC } from 'react';
import { Box } from '@sweatpants/box';
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
import uniqby from 'lodash.uniqby';
import data, { Row } from '__delverData';

import { Button } from '@src/components/button';
import { Thr, Tr } from '@src/components/tableComponents';
import {
  HeaderCell,
  NameCell,
  FromCell,
  InstancesCell
} from '@src/components/cells';
import { TextField } from '@src/components/textfield';
import { Search } from '@src/components/icons';
import { Select } from '@src/components/select';

const config = __delverConfig;

const fromOptions = data
  .filter(({ from }) => from !== 'indeterminate')
  .map(({ from }) => ({ value: from, text: from }));
const uniqFromOptions = uniqby(fromOptions, ({ value }) => value);

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
        if (from && row.getValue('from') !== from) {
          show = false;
        }
        return show;
      }
    }
  });

const columns = [
  table.createDataColumn('name', {
    header: (p) => <HeaderCell id={p.header.id} />,
    cell: NameCell,
    filterFn: 'global'
  }),
  table.createDataColumn('from', {
    header: (p) => <HeaderCell id={p.header.id} />,
    cell: FromCell,
    filterFn: 'global'
  }),
  table.createDataColumn('count', {
    header: (p) => <HeaderCell id={p.header.id} />,
    cell: (props) => <InstancesCell {...props} />,
    filterFn: 'global'
  })
];

const Table = () => {
  const [global, setGlobal] = React.useState({ search: '', from: '' });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'count', desc: true }
  ]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      pagination,
      globalFilter: global,
      sorting
    },
    globalFilterFn: 'global',
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
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
              options={uniqFromOptions}
            />
          </div>
        </Box>
      </Box>

      <Box fontSize="100" mb="600">
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
        </>
      )}
    </>
  );
};

export const Dashboard: FC<{}> = (props) => {
  return (
    <>
      <Box as="h1" fontSize="500" mb="600">
        {config.title}
      </Box>
      <Table />
    </>
  );
};
