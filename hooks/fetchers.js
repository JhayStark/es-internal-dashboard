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
    `${passedUrl}?page=${pageNumber}&limit=${pageSize}&search=${filterText}`,
    tableDataFetcher
  );

  const handlePageNumberChange = (newPerPage, page) => {
    setPageNumber(page);
    setPageSize(newPerPage);
  };

  const handlePageChange = page => {
    setPageNumber(page);
  };

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
    'https://internal-manager-api.onrender.com/api/reports/service-total',
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

function useRegionalDistribution() {
  const regionalDistributionFetcher = async url => {
    return await axios.get(url).then(res => res.data.regionalDistributions);
  };

  const { data, error, isLoading } = useSWR(
    `https://internal-manager-api.onrender.com/api/reports/regional-distributions`,
    regionalDistributionFetcher
  );
  return {
    regionalDistribution: data,
    regionalDistributionisLoading: isLoading,
    regionalDistributionError: error,
  };
}

function useAdmins() {
  const adminsFetcher = async url => {
    return await axios.get(url).then(res => res.data.admins);
  };

  const { data, error, isLoading } = useSWR(
    'https://internal-manager-api.onrender.com/api/admins',
    adminsFetcher
  );
  return {
    adminData: data,
    adminDataIsLoading: isLoading,
    adminDataError: error,
  };
}

export {
  useServiceTotals,
  useTableData,
  useClientProfile,
  useRegionalDistribution,
  useAdmins,
};
