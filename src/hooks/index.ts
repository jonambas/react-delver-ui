import data, { Row } from '__delverData';

type Component = Row;

export const useComponent = (name: string): Component => {
  const component = data.find(
    (row) => row.name.toLowerCase() === name.toLowerCase()
  );
  return component;
};
