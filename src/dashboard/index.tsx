import React, { FC } from 'react';
import { Box } from '@sweatpants/box';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  filterFns,
  SortingState,
  ColumnDef,
  FilterFn
} from '@tanstack/react-table';
import uniqby from 'lodash.uniqby';
import { useNavigate } from 'react-router-dom';
import data from '__delverData';
import type { Result } from 'react-delver';

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
  .filter(({ from }) => from !== 'indeterminate' && from !== undefined)
  .map(({ from }) => from);
const uniqFromOptions = uniqby(fromOptions, (v: string) => v);
const total = data.reduce((acc, c) => acc + c.count, 0);

const filter: FilterFn<Result> = (row, columnId, values = {}, addMeta) => {
  const { search, from } = values;
  let show = true;

  if (!filterFns.includesString(row, columnId, search, addMeta)) {
    show = false;
  }
  if (from && row.getValue('from') !== from) {
    show = false;
  }
  return show;
};

const columns: ColumnDef<Result>[] = [
  {
    accessorKey: 'name',
    header: HeaderCell,
    cell: NameCell,
    enableGlobalFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'from',
    header: HeaderCell,
    cell: FromCell,
    enableGlobalFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'count',
    header: HeaderCell,
    cell: (props) => <InstancesCell {...props} />,
    enableGlobalFilter: true,
    enableSorting: true
  }
];

const Table = () => {
  const navigate = useNavigate();
  const [global, setGlobal] = React.useState({ search: '', from: '' });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'count', desc: true }
  ]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });

  const instance = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter: global,
      sorting
    },
    globalFilterFn: filter,
    getCoreRowModel: getCoreRowModel<Result>(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination
  });

  const noResults = instance.getFilteredRowModel().rows.length === 0;
  const filteredTotal = instance.getFilteredRowModel().rows.reduce((acc, c) => {
    return acc + c.original.count;
  }, 0);

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
        Showing {instance.getFilteredRowModel().rows.length.toLocaleString()} of{' '}
        {instance.getCoreRowModel().rows.length.toLocaleString()} unique
        components, and {filteredTotal.toLocaleString()} of{' '}
        {total.toLocaleString()} component instances.
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
                return <Thr key={group.id} headers={group.headers} />;
              })}
            </thead>
            <tbody>
              {instance.getRowModel().rows.map((row) => {
                const name = row.getValue('name').toLowerCase();
                const onClick = () => {
                  navigate(`/component/${name}`);
                };

                return (
                  <Tr
                    key={row.id}
                    cells={row.getVisibleCells()}
                    onClick={onClick}
                  />
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
