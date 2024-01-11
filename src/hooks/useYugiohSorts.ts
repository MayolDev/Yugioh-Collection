interface Props {
    setSort: (sort: string) => void;
    setOrder: (order: string) => void;
}
type SortFunction = (sortProperty: string) => void;

export const useYugiohSorts = ({setSort, setOrder}: Props) => {

  const sortBy: { [key: string]: SortFunction } = {
    name: createSortFunction("name"),
    level: createSortFunction("level"),
    frameType: createSortFunction("frameType"),
    race: createSortFunction("race"),
    type: createSortFunction("type"),
    attribute: createSortFunction("attribute"),
  };

  function createSortFunction(sortProperty: string): SortFunction {
      return () => setSort(sortProperty);
  }

  function handleSelectChange(e: any) {
      setOrder(e.target.value);
  }

  return { sortBy, handleSelectChange };
}