const { useQuery } = require('react-query')

export function useData() {
  return useQuery({
    queryKey: ['ag-grid-data'],
    queryFn: () => fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then(data => data)
  })
}
