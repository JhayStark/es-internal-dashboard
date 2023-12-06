import api from '@/utils/axiosInstance';
import useSWR from 'swr';
import { useState } from 'react';
import axios from 'axios';
import mtnApi from '../utils/mtnInstance';

function useTableData(passedUrl, queryAlreadyExists = false) {
  const tableDataFetcher = async url => {
    return await api.get(url).then(res => res.data);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterText, setFilterText] = useState('');
  let url = `${passedUrl}?page=${pageNumber}&limit=${pageSize}&search=${filterText}`;
  if (queryAlreadyExists) {
    url = `${passedUrl}&page=${pageNumber}&limit=${pageSize}&search=${filterText}`;
  }

  const { data, error, isLoading } = useSWR(url, tableDataFetcher);

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
    return await api.get(url).then(res => res.data.data);
  };

  const { data, error, isLoading } = useSWR(
    '/reports/service-total',
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
    return await api.get(url).then(res => res.data);
  };

  const { data, error, isLoading } = useSWR(`/clients/${id}`, profileFetcher);
  return {
    profile: data,
    profileisLoading: isLoading,
    profileError: error,
  };
}

function useRegionalDistribution(passedUrl) {
  const regionalDistributionFetcher = async url => {
    return await api.get(url).then(res => res.data.regions);
  };

  const { data, error, isLoading } = useSWR(
    passedUrl,
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
    return await api.get(url).then(res => res.data.admins);
  };

  const { data, error, isLoading } = useSWR('/admins', adminsFetcher);
  return {
    adminData: data,
    adminDataIsLoading: isLoading,
    adminDataError: error,
  };
}

function useServiceStatistics() {
  const statisticsFetcher = async url => {
    return await api.get(url).then(res => res.data.totalUsers);
  };

  const { data, error, isLoading } = useSWR(
    '/clients/total-users',
    statisticsFetcher
  );
  return {
    serviceStatistics: data,
    serviceStatisticsIsLoading: isLoading,
    serviceStatisticsError: error,
  };
}

function usePermissions() {
  const permissionsFetcher = async url => {
    return await api.get(url).then(res => res.data.data);
  };

  const { data, error, isLoading } = useSWR('/permissions', permissionsFetcher);
  return {
    permissions: data,
    permissionsIsLoading: isLoading,
    permissionsError: error,
  };
}

function useSingleAdmin(id) {
  const singleAdminFetcher = async url => {
    return await api.get(url).then(res => res.data);
  };

  const { data, error, isLoading } = useSWR(
    `/admins/${id}`,
    singleAdminFetcher
  );
  return {
    singleAdmin: data,
    singleAdminIsLoading: isLoading,
    singleAdminError: error,
  };
}

function useDepartments() {
  const departmentFetcher = async url => {
    return await api.get(url).then(res => res.data.data);
  };

  const { data, error, isLoading } = useSWR(`/departments`, departmentFetcher);
  return {
    departments: data,
    departmentsIsLoading: isLoading,
    departmentsError: error,
  };
}

function useUserProfile() {
  const userProfileFetcher = async url => {
    return await api.get(url).then(res => res.data);
  };

  const { data, error, isLoading } = useSWR(`/profiles`, userProfileFetcher);
  return {
    profile: data,
    profileIsLoading: isLoading,
    profileError: error,
  };
}

function useCountries() {
  const countryDropdownFetcher = async url => {
    return await api.get(url).then(res => res.data.countries);
  };

  const { data, error, isLoading } = useSWR(
    `/reports/farmers/countries`,
    countryDropdownFetcher
  );
  return {
    countries: data,
    countriesIsLoading: isLoading,
    countriesError: error,
  };
}

function useRegionalStatsData() {
  const regionalStatsFetcher = async url => {
    return await api.get(url).then(res => res.data);
  };

  const { data, error, isLoading } = useSWR(
    `/reports/farmers/by-region?country=Ghana`,
    regionalStatsFetcher
  );
  return {
    regionalStats: data,
    regionalStatsIsLoading: isLoading,
    regionalStatsError: error,
  };
}

function useMarketPrices() {
  const tableDataFetcher = async url => {
    return await mtnApi.get(url).then(res => res.data);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState({});

  const { data, error, isLoading } = useSWR(
    `https://api-agrosmart-esoko.onrender.com/market-prices?page=${pageNumber}&limit=${pageSize}&commodity=${filterText}&location=${location}&startDate=&endDate=`,
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

function useMarkets() {
  const markets = async url => {
    return await mtnApi.get(url).then(res => res.data);
  };

  const { data, error, isLoading } = useSWR('/markets', markets);
  return {
    markets: data,
    marketsIsLoading: isLoading,
    marketsError: error,
  };
}

function useFarmerTypes() {
  const markets = async url => {
    return await mtnApi.get(url).then(res => res.data);
  };

  const { data, error, isLoading } = useSWR('/farmer-types', markets);
  return {
    farmerTypes: data,
    farmerTypesIsLoading: isLoading,
    farmerTypesError: error,
  };
}

function useClimateSmartData(date = '') {
  const climateSmartData = async url => {
    return await mtnApi.get(url).then(res => res.data);
  };

  const { data, error, isLoading } = useSWR(
    `agronomic-advice?datePublished=${date}`,
    climateSmartData
  );
  return {
    agronomicAdivce: data,
    agronomicAdviceIsLoading: isLoading,
    agronomicAdivceError: error,
  };
}

export {
  useServiceTotals,
  useTableData,
  useClientProfile,
  useRegionalDistribution,
  useAdmins,
  useServiceStatistics,
  usePermissions,
  useSingleAdmin,
  useDepartments,
  useUserProfile,
  useCountries,
  useRegionalStatsData,
  useMarketPrices,
  useMarkets,
  useFarmerTypes,
  useClimateSmartData,
};
