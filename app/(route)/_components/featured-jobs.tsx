'use client'

import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Clock, Filter, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Loading from '../loading';
import { Job } from '@/interfaces/Job';
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Checkbox } from '@/components/ui/checkbox'

function truncateText(text: string, limit: number): string {
  const words = text.split(/\s+/);
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
}

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [displayIndex, setDisplayIndex] = useState(0);
  const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
  // State to track multiple selected types
  // const [selectedTypes, setSelectedTypes] = useState<string[]>([]);


  const [searchTerm, setSearchTerm] = useState<string>('');
  const [jobTerm, setJobTerm] = useState<string>('');
  const [companyTerm, setCompanyTerm] = useState<string>('');
  const [countryTerm, setCountryTerm] = useState<string>('');


  const [selectedType, setSelectedType] = useState<string[] | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[] | null>([]);
  const [selectedCompany, setSelectedCompany] = useState<string[] | null>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const jsonData = await response.json();
        // console.log('Fetched Data:', jsonData);

        if (jsonData.data && Array.isArray(jsonData.data)) {
          setJobs(jsonData.data);
        } else {
          throw new Error('Data format error: Expected an array');
        }
      } catch (error: any) {
        console.error('Fetch Error:', error);
        setError(error.message || 'An error occurred');
      }
    };

    fetchData();
  }, []);


  // console.log('jobs',jobs)

  const filteredJobs = jobs.filter(job => {
    return (!selectedType || selectedType.length === 0 || (job.Type && selectedType.includes(job.Type))) &&
      (!selectedCountry || selectedCountry.length === 0 || (job.Country && selectedCountry.includes(job.Country))) &&
      (!selectedCompany || selectedCompany.length === 0 || (job.Company && selectedCompany.includes(job.Company))) &&
      job.Role?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log('Filtered Jobs', filteredJobs)




  // Unique Filter with no repeation
  const uniqueTypes = new Set<string>();
  const uniqueJobs = jobs.filter(cat => cat.Type && !uniqueTypes.has(cat.Type) && cat.Type.trim() !== "" && uniqueTypes.add(cat.Type));

  const uniqueCountries = new Set<string>();
  const uniqueCountry = jobs.filter(cat => cat.Country && !uniqueCountries.has(cat.Country) && cat.Country.trim() !== "" && uniqueCountries.add(cat.Country));

  const uniqueCompanies = new Set<string>();
  const uniqueCompany = jobs.filter(cat => cat.Company && !uniqueCompanies.has(cat.Company) && cat.Company.trim() !== "" && uniqueCompanies.add(cat.Company));



  // Handle Clicks Function
  // const handleTypeClick = (type: string | undefined) => {
  //   if (type === undefined) return; // Do nothing if type is undefined
  //   setSelectedType(type === selectedType ? null : type);
  // };

  // const handleCompanyClick = (company: string | undefined) => {
  //   if (company === undefined) return; // Ignore undefined values
  //   setSelectedCompany(company === selectedCompany ? null : company);
  // };

  // const handleCountryClick = (country: string | undefined) => {
  //   if (country === undefined) return; // Ignore undefined values
  //   setSelectedCountry(country === selectedCountry ? null : country);
  // };

  const handleTypeClick = (type: string | undefined) => {
    if (type === undefined) return;  // Exit early if type is undefined
    setSelectedType(prevTypes => {
      const currentTypes = prevTypes || [];
      if (currentTypes.includes(type)) {
        return currentTypes.filter(t => t !== type);
      } else {
        return [...currentTypes, type];
      }
    });
  };

  const handleCompanyClick = (company: string | undefined) => {
    if (company === undefined) return;  // Ignore undefined values
    setSelectedCompany(prevCompanies => {
      const currentCompanies = prevCompanies || [];
      if (currentCompanies.includes(company)) {
        return currentCompanies.filter(c => c !== company);
      } else {
        return [...currentCompanies, company];
      }
    });
  };

  const handleCountryClick = (country: string | undefined) => {
    if (country === undefined) return;  // Ignore undefined values
    setSelectedCountry(prevCountries => {
      const currentCountries = prevCountries || [];
      if (currentCountries.includes(country)) {
        return currentCountries.filter(c => c !== country);
      } else {
        return [...currentCountries, country];
      }
    });
  };


  const filterClick = () => {
    setFilter(!filter)
  }







  // Function to clear all selected types
  const clearSelectedTypes = () => {
    setSelectedType([]);  // Clear the array
  };

  const clearSelectedCountries = () => {
    setSelectedCountry([]);  // Clear the array
  };

  const clearSelectedCompanies = () => {
    setSelectedCompany([]);  // Clear the array
  };



  // Pagination
  const loadMoreJobs = () => {
    setDisplayIndex(prevIndex => prevIndex + 10);
  };

  const goBack = () => {
    setDisplayIndex(prevIndex => Math.max(0, prevIndex - 10));
  };

  const endIndex = Math.min(displayIndex + 10, jobs.length);


  // if (isLoading) return <Loading />;
  // if (error) return <p>{error}</p>;




  return (
    <Container className='py-[50px]'>
      <div className='grid md:grid-cols-12 grid-cols-1 gap-[50px]'>
        <div className='md:hidden flex'>
          <Button className='flex gap-2 items-center' onClick={filterClick}>
            <Filter size={16} />
            Filter
          </Button>
        </div>
        <div className='md:col-span-4 col-span-8 md:flex hidden flex-col gap-[30px]'>


          <div className='sm:p-[20px] p-[15px] bg-white border rounded-3xl '>
            <div className='mb-[20px]'>
              <h2 className='text-lg font-bold mb-3'>Search Jobs</h2>
              <div className='flex items-center w-full border-grey shadow-md border-[1px] px-[12px] py-[12px] rounded-[12px] bg-white'>
                <Search className='w-4 h-4' />
                <Input
                  type='text'
                  placeholder='Job title, keyword'
                  className='border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>


          <div className='sm:p-[20px] p-[15px] bg-white border rounded-3xl '>
            <div className='flex justify-between items-center mb-[20px]'>
              <h4 className='font-bold text-sm '><span className='font-normal'>Filter by </span>Job Type</h4>
              <div>
                <Button variant={'link'} className='text-blue-500' onClick={clearSelectedTypes}>Clear</Button>
              </div>
            </div>

            <div className='flex items-center w-full px-[12px] py-[6px] rounded-[12px] bg-lightGrey mb-[20px]'>
              <Search className='w-4 h-4' />
              <Input
                type='text'
                placeholder='e.g. "Maintenance"'
                className='border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent'
                value={jobTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTerm(e.target.value)}
              />
            </div>

            <div className='flex flex-wrap gap-4'>
              <ScrollArea className="h-[150px] w-full ">
                <div className=''>


                  {uniqueJobs
                    .filter(cat => cat.Type !== undefined && cat.Type.toLowerCase().includes(jobTerm.toLowerCase()))
                    .map((cat, index) => (
                      <div
                        key={index}
                        className={`py-4 flex flex-col bg-transparent text-black p-0 hover:bg-transparent hover:font-bold transition ease-linear duration-75 
      `}>
                        <div className="flex items-center space-x-2">
                          <Checkbox id={cat.Type} onClick={() => handleTypeClick(cat.Type)} />
                          <label
                            htmlFor={cat.Type}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer 
                            ${selectedType && cat.Type && selectedType.includes(cat.Type) ? 'font-bold' : ''}`}
                          >
                            {cat.Type}
                          </label>
                        </div>
                      </div>
                    ))
                  }




                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>


          <div className='sm:p-[20px] p-[15px] bg-white border rounded-3xl '>
            <div className='mb-4'>
              <div className='flex justify-between items-center mb-[20px]'>
                <h4 className='font-bold text-sm'><span className='font-normal'>Filter by </span>Location</h4>
                <div>
                  <Button variant={'link'} className='text-blue-500' onClick={clearSelectedCountries}>Clear</Button>
                </div>
              </div>

              <div className='flex items-center w-full px-[12px] py-[6px] rounded-[12px] bg-lightGrey'>
                <Search className='w-4 h-4' />
                <Input
                  type='text'
                  placeholder='Job title, keyword'
                  className='border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent'
                  value={countryTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountryTerm(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-wrap gap-4'>
              <ScrollArea className="h-[150px] w-full ">
                <div className='flex flex-col items-start gap-4'>


                  {uniqueCountry
                    .filter(cat => cat.Country !== undefined && cat.Country.toLowerCase().includes(countryTerm.toLowerCase()))
                    .map((cat, index) => (
                      <div
                        key={index}
                        className={`py-2 flex flex-col bg-transparent text-black p-0 hover:bg-transparent hover:font-bold transition ease-linear duration-75 
      `}>
                        <div className="flex items-center space-x-2">
                          <Checkbox id={cat.Type} onClick={() => handleTypeClick(cat.Type)} />
                          <label
                            htmlFor={cat.Type}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer 
                            ${selectedCountry && cat.Country && selectedCountry.includes(cat.Country) ? 'font-bold' : ''}`}
                          >
                            {cat.Country}
                          </label>
                        </div>
                      </div>
                    ))
                  }




                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>


          <div className='sm:p-[20px] p-[15px] bg-white border rounded-3xl '>
            <div className='flex justify-between items-center mb-[20px]'>
              <h4 className='font-bold text-sm '><span className='font-normal'>Filter by </span>Companies</h4>
              <div>
                <Button variant={'link'} className='text-blue-500' onClick={clearSelectedCompanies}>Clear</Button>
              </div>
            </div>

            <div className='flex items-center w-full px-[12px] py-[6px] rounded-[12px] bg-lightGrey mb-[20px]'>
              <Search className='w-4 h-4' />
              <Input
                type='text'
                placeholder='Job title, keyword'
                className='border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent'
                value={companyTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyTerm(e.target.value)}
              />
            </div>

            <div className='flex flex-wrap gap-4'>
              <ScrollArea className="h-[150px] w-full ">
                <div className='flex flex-col items-start gap-4'>


                  {uniqueCompany
                    .filter(cat => cat.Company !== undefined && cat.Company.toLowerCase().includes(companyTerm.toLowerCase()))
                    .map((cat, index) => (
                      <div
                        key={index}
                        className={` py-2 flex flex-col bg-transparent text-black p-0 hover:bg-transparent hover:font-bold transition ease-linear duration-75 
      `}>
                        <div className="flex items-center space-x-2">
                          <Checkbox id={cat.Type} onClick={() => handleTypeClick(cat.Type)} />
                          <label
                            htmlFor={cat.Type}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer 
                            ${selectedCompany && cat.Company && selectedCompany.includes(cat.Company) ? 'font-bold' : ''}`}
                          >
                            {cat.Company}
                          </label>
                        </div>
                      </div>


                    ))
                  }



                </div>
                <ScrollBar
                  orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        </div>

        {filter ? (
          <div className='md:col-span-4 col-span-8 md:hidden flex flex-col gap-[30px]'>


            <div className='sm:p-[20px] p-[15px] bg-white border rounded-3xl '>
              <div className='mb-[20px]'>
                <h2 className='text-lg font-bold mb-3'>Search Jobs</h2>
                <div className='flex items-center w-full border-grey shadow-md border-[1px] px-[12px] py-[12px] rounded-[12px] bg-white'>
                  <Search className='w-4 h-4' />
                  <Input
                    type='text'
                    placeholder='Job title, keyword'
                    className='border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>


            <div className='sm:p-[20px] p-[15px] bg-white border rounded-3xl '>
              <div className='flex justify-between items-center mb-[20px]'>
                <h4 className='font-bold text-sm '><span className='font-normal'>Filter by </span>Job Type</h4>
                <div>
                  <Button variant={'link'} className='text-blue-500' onClick={clearSelectedTypes}>Clear</Button>
                </div>
              </div>

              <div className='flex items-center w-full px-[12px] py-[6px] rounded-[12px] bg-lightGrey mb-[20px]'>
                <Search className='w-4 h-4' />
                <Input
                  type='text'
                  placeholder='e.g. "Maintenance"'
                  className='border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent'
                  value={jobTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTerm(e.target.value)}
                />
              </div>

              <div className='flex flex-wrap gap-4'>
                <ScrollArea className="h-[150px] w-full ">
                  <div className=''>


                    {uniqueJobs
                      .filter(cat => cat.Type !== undefined && cat.Type.toLowerCase().includes(jobTerm.toLowerCase()))
                      .map((cat, index) => (
                        <div
                          key={index}
                          className={`py-4 flex flex-col bg-transparent text-black p-0 hover:bg-transparent hover:font-bold transition ease-linear duration-75 
      `}>
                          <div className="flex items-center space-x-2">
                            <Checkbox id={cat.Type} onClick={() => handleTypeClick(cat.Type)} />
                            <label
                              htmlFor={cat.Type}
                              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer 
                            ${selectedType && cat.Type && selectedType.includes(cat.Type) ? 'font-bold' : ''}`}
                            >
                              {cat.Type}
                            </label>
                          </div>
                        </div>
                      ))
                    }




                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>


            <div className='sm:p-[20px] p-[15px] bg-white border rounded-3xl '>
              <div className='mb-4'>
                <div className='flex justify-between items-center mb-[20px]'>
                  <h4 className='font-bold text-sm'><span className='font-normal'>Filter by </span>Location</h4>
                  <div>
                    <Button variant={'link'} className='text-blue-500' onClick={clearSelectedCountries}>Clear</Button>
                  </div>
                </div>

                <div className='flex items-center w-full px-[12px] py-[6px] rounded-[12px] bg-lightGrey'>
                  <Search className='w-4 h-4' />
                  <Input
                    type='text'
                    placeholder='Job title, keyword'
                    className='border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent'
                    value={countryTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountryTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap gap-4'>
                <ScrollArea className="h-[150px] w-full ">
                  <div className='flex flex-col items-start gap-4'>


                    {uniqueCountry
                      .filter(cat => cat.Country !== undefined && cat.Country.toLowerCase().includes(countryTerm.toLowerCase()))
                      .map((cat, index) => (
                        <div
                          key={index}
                          className={`py-2 flex flex-col bg-transparent text-black p-0 hover:bg-transparent hover:font-bold transition ease-linear duration-75 
      `}>
                          <div className="flex items-center space-x-2">
                            <Checkbox id={cat.Type} onClick={() => handleTypeClick(cat.Type)} />
                            <label
                              htmlFor={cat.Type}
                              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer 
                            ${selectedCountry && cat.Country && selectedCountry.includes(cat.Country) ? 'font-bold' : ''}`}
                            >
                              {cat.Country}
                            </label>
                          </div>
                        </div>
                      ))
                    }




                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>


            <div className='sm:p-[20px] p-[15px] bg-white border rounded-3xl '>
              <div className='flex justify-between items-center mb-[20px]'>
                <h4 className='font-bold text-sm '><span className='font-normal'>Filter by </span>Companies</h4>
                <div>
                  <Button variant={'link'} className='text-blue-500' onClick={clearSelectedCompanies}>Clear</Button>
                </div>
              </div>

              <div className='flex items-center w-full px-[12px] py-[6px] rounded-[12px] bg-lightGrey mb-[20px]'>
                <Search className='w-4 h-4' />
                <Input
                  type='text'
                  placeholder='Job title, keyword'
                  className='border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent'
                  value={companyTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyTerm(e.target.value)}
                />
              </div>

              <div className='flex flex-wrap gap-4'>
                <ScrollArea className="h-[150px] w-full ">
                  <div className='flex flex-col items-start gap-4'>


                    {uniqueCompany
                      .filter(cat => cat.Company !== undefined && cat.Company.toLowerCase().includes(companyTerm.toLowerCase()))
                      .map((cat, index) => (
                        <div
                          key={index}
                          className={` py-2 flex flex-col bg-transparent text-black p-0 hover:bg-transparent hover:font-bold transition ease-linear duration-75 
      `}>
                          <div className="flex items-center space-x-2">
                            <Checkbox id={cat.Type} onClick={() => handleTypeClick(cat.Type)} />
                            <label
                              htmlFor={cat.Type}
                              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer 
                            ${selectedCompany && cat.Company && selectedCompany.includes(cat.Company) ? 'font-bold' : ''}`}
                            >
                              {cat.Company}
                            </label>
                          </div>
                        </div>


                      ))
                    }



                  </div>
                  <ScrollBar
                    orientation="vertical" />
                </ScrollArea>
              </div>
            </div>
          </div>
        ) : ''}





        {/* 2nd Grid-Col */}
        <div className='md:col-span-1 col-span-8 flex items-center justify-center'>
          <Separator orientation="vertical" className='md:flex hidden' />
          <Separator orientation="horizontal" className='md:hidden flex ' />
        </div>
        <div className='md:col-span-7 col-span-8 flex flex-col gap-[30px]'>
          <div>
            <h2 className='text-3xl font-bold mb-2'>Recent Jobs</h2>
            <p className='text-darkGrey'>{filteredJobs.length} recent jobs are posted</p>
          </div>
          {filteredJobs.slice(displayIndex, displayIndex + 10).map((job, index) => (
            <Link key={index} href={`/job/${job.Id}`}>
              <div key={index} className='border bg-white sm:px-[20px] px-[15px] py-[20px] rounded-3xl flex flex-col gap-[20px] hover:shadow-lg transition ease-linear duration-75'>
                <div>
                  <h2 className='text-xl font-bold mb-2'>{job.Role}</h2>
                  <div className='flex sm:flex-row flex-col items-start gap-4'>
                    <p className='text-darkGrey font-bold '>{job.Company || 'Company Not Listed'}</p>
                    <p className=''><span className='p-1 bg-gray-100 text-black mr-2 rounded-sm'>{job.City}</span> <span className='p-1 bg-gray-100 text-black mr-2 rounded-sm'>{job.State}</span>  <span className='font-bold'>{job.Country}</span></p>
                  </div>

                </div>
                <div>
                  <p className='text-grey text-sm mb-4'>
                    {job.HowToApply?.slice(0, 100)}
                  </p>
                  <div className='flex gap-4'>
                    <Button disabled className='bg-gray-200 text-black'>{job.Type || "Not Disclosed"}</Button>
                    <Button disabled className='bg-gray-200 text-black'>{job.Status || "Not Disclosed"}</Button>
                  </div>
                </div>
                <div className='w-full h-[1px] bg-gray-200' />
                <div className='grid sm:grid-cols-4 grid-cols-1 '>
                  <div className='sm:hidden flex mb-4 justify-between flex-wrap gap-3'>
                    <p className='font-bold flex items-center text-sm'>{job.Salary ? `${job.Salary.toLocaleString()}` : 'Salary Not Disclosed'}</p>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm text-grey'>
                        <span className='text-black font-bold'>Posting Date:</span> {job.postingDate.slice(0, 10)}
                      </p>

                    </div>

                  </div>

                  <p className='font-bold sm:flex hidden items-center text-sm'>{job.Salary ? `${job.Salary.toLocaleString()}` : 'Salary Not Disclosed'}</p>
                  <div className='sm:flex hidden col-span-2  items-center gap-2'>
                    <p className='text-sm text-grey'>
                      <span className='text-black font-bold'>Posting Date:</span> {job.postingDate.slice(0, 10)}
                    </p>

                  </div>
                  <Button className='rounded-xl'>
                    <Link target='_blank' href={job.jobLink ? new URL(job.jobLink).toString() : ''}>
                      Apply Now
                    </Link>
                  </Button>
                </div>

              </div>
            </Link>
          ))}
          <div className='flex justify-between items-center'>
            {displayIndex > 0 && (
              <Button variant={'outline'} onClick={goBack}>Back</Button>
            )}
            <div>Showing {displayIndex + 1} to {endIndex} of {filteredJobs.length} jobs</div>
            {displayIndex + 10 < filteredJobs.length && (
              <Button onClick={loadMoreJobs}>Next</Button>
            )}
          </div>

        </div>
      </div>
    </Container>
  )
}

export default FeaturedJobs