import { MouseEventHandler } from "react";

interface Props {
    setSort: (sort: string) => void;
    setOrder: (order: string) => void;
}

export const useYugiohSorts = ({setSort, setOrder}: Props) => {

  const sortBy: { [key: string]: MouseEventHandler } = {
    name: createSortFunction("name"),
    level: createSortFunction("level"),
    frameType: createSortFunction("frameType"),
    race: createSortFunction("race"),
    type: createSortFunction("type"),
    attribute: createSortFunction("attribute"),
  };

  function createSortFunction(sortProperty: string): MouseEventHandler {
      return () => setSort(sortProperty);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
      setOrder(e.target.value);
  }

  return { sortBy, handleSelectChange };
}