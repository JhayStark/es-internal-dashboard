import axios from 'axios';
import useSWR from 'swr';
import { useState } from 'react';

function useTableData(passedUrl, includesQuery) {
  const tableDataFetcher = async url => {
    return await axios.get(url).then(res => res.data);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterText, setFilterText] = useState('');

  let generatedUrl;

  if (includesQuery) {
    generatedUrl = `${passedUrl}&page=${pageNumber}&limit=${pageSize}&search=${filterText}`;
  } else {
    generatedUrl = `${passedUrl}?page=${pageNumber}&limit=${pageSize}&search=${filterText}`;
  }

  const { data, error, isLoading } = useSWR(generatedUrl, tableDataFetcher);

  const handlePageNumberChange = (newPerPage, page) => {
    setPageNumber(page);
    setPageSize(newPerPage);
  };

  const handlePageChange = page => {
    setPageNumber(page);
  };
  console.log(pageSize, pageNumber);

  return {
    tableData: data,
    tableDataIsLoading: isLoading,
    tableDataError: error,
    handlePageNumberChange,
    setFilterText,
    filterText,
    handlePageChange,
  };
}

function useServiceTotals() {
  const statisticsFetcher = async url => {
    return await axios.get(url).then(res => res.data.data);
  };

  const { data, error, isLoading } = useSWR(
    'https://internal-manager-api.onrender.com/api/reports?type=service-total',
    statisticsFetcher
  );

  return {
    serviceTotals: data,
    serviceTotalsisLoading: isLoading,
    serviceTotalsError: error,
  };
}

function useClientProfile(id) {
  const profileFetcher = async url => {
    return await axios.get(url).then(res => res.data);
  };

  const { data, error, isLoading } = useSWR(
    `https://internal-manager-api.onrender.com/api/clients/${id}`,
    profileFetcher
  );
  return {
    profile: data,
    profileisLoading: isLoading,
    profileError: error,
  };
}

export { useServiceTotals, useTableData, useClientProfile };
