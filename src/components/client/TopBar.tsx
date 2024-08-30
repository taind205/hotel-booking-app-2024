'use client'
import { useState } from "react";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useOutsideClick } from "./hook";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

type Location = {
  id: number;
  name: string;
};

export default function TopBar(props:{locationSearchData:Location[]}) {
    return (
      <div className="tall:sticky tall:top-0 flex flex-col sm:flex-row justify-center items-center p-2 gap-4 bg-blue-300 w-full z-20">
        <SearchBar data={props.locationSearchData}/>
        <DateRangeInput/>
      </div>
    );
  }

const SearchBar:React.FC<{data:Location[]}>=({data})=>{
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter(l=>l.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,10);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const rootDivComponentRef = React.useRef<HTMLDivElement>(null);
  useOutsideClick(rootDivComponentRef,()=>setIsSearchResultsOpen(false));

  const searchParams = useSearchParams()
  const checkInDate = searchParams.get('checkin')
  const checkOutDate = searchParams.get('checkout')
  const newSearchParams = (checkInDate&&checkOutDate)?`?checkin=${checkInDate}&checkout=${checkOutDate}&location=`:'?location='

  const handleSearchTermChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setSearchTerm(e.target.value);
    setIsSearchResultsOpen(true);
  }

    return(
        <div ref={rootDivComponentRef} className="relative max-w-80 pt-2">
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              id="search-bar"
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchTermChange}
              onClick={()=>setIsSearchResultsOpen(true)}
            />
            {isSearchResultsOpen && <div className="absolute z-50 w-full bg-slate-700">
              {
              filteredData.length>0?
                filteredData.map(v=> 
                  <div key={v.id} className="flex justify-between rounded-xl hover:bg-slate-600 px-2 py-1">
                      <Link onClick={()=>setIsSearchResultsOpen(false)} className="w-full" href={newSearchParams+v.id}>{v.name}</Link>
                  </div>)
              : <p className="px-2 py-1">No result found</p>
              }
            </div>}
          </div>
    )
}

const DateRangeInput:React.FC<{}> = () => {
    const [checkInDate, setCheckInDate] = useState<Dayjs|null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Dayjs|null>(null);
    
    const searchParams = useSearchParams()
    const location = searchParams.get('location')
    const newSearchParams = (checkInDate&&checkOutDate)?`?checkin=${checkInDate.toDate().getTime()}&checkout=${checkOutDate.toDate().getTime()}&location=${location||""}`:`?location=${location||""}`
  
    const handleCheckInDateChange = (date:Dayjs|null) => {
      setCheckInDate(date);
    };
    
    const handleCheckOutDateChange = (date:Dayjs|null) => {
      setCheckOutDate(date);
    };
  
    return (
        <div className="relative">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 flex-col xs:flex-row">
                  <DatePicker
                    className="max-w-40"
                    label="Check-in date"
                    value={checkInDate}
                    onChange={handleCheckInDateChange}
                  />
                  <DatePicker
                    className="max-w-40"
                    label="Check-out date"
                    value={checkOutDate}
                    onChange={handleCheckOutDateChange}
                  />
                </div>
                <Link className="bg-blue-700 h-12 p-2 rounded-xl" href={newSearchParams}>
                  <FilterAltIcon fontSize="medium"/>
                </Link>
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </div>
    );
  }
  