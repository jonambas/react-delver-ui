import data from '__delverData';
import type { Result } from 'react-delver';

export const useComponent = (name: string): Result => {
  const component = data.find(
    (row) => row.name.toLowerCase() === name.toLowerCase()
  );
  return component;
};
