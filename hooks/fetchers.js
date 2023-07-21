import axios from 'axios';
import useSWR from 'swr';
import { useState } from 'react';

function useTableData(passedUrl) {
  const tableDataFetcher = async url => {
    return await axios.get(url).then(res => res.data);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterText, setFilterText] = useState('');

  const { data, error, isLoading } = useSWR(
    `${passedUrl}&page=${pageNumber}&limit=${pageSize}&search=${filterText}`,
    tableDataFetcher
  );

  const handlePageNumberChange = (newPerPage, page) => {
    setPageNumber(page);
    setPageSize(newPerPage);
  };

  return {
    tableData: data,
    tableDataIsLoading: isLoading,
    tableDataError: error,
    handlePageNumberChange,
    setFilterText,
    filterText,
  };
}

function useServiceTotals(passedUrl) {
  const statisticsFetcher = async url => {
    return await axios.get(url).then(res => res.data.data);
  };

  const { data, error, isLoading } = useSWR(passedUrl, statisticsFetcher);

  return {
    serviceTotals: data,
    serviceTotalsisLoading: isLoading,
    serviceTotalsError: error,
  };
}

export { useServiceTotals, useTableData };
