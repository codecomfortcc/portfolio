'use client'
import { Search } from 'lucide-react'
import React, { FormEventHandler } from 'react'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
const SearchComponent = () => {
  // projects-search filter
  const [search, setSearch] = React.useState('')

  const router=useRouter();
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const handleSearch = (e:React.FormEvent) => {
    e.preventDefault()
    router.push(`/projects?${search}`)
  }
  return (
    <form>
    <Input onChange={handleChange} onSubmit={handleSearch} value={search} className='rounded-full border-gray-600 pr-8 border-[3px] bg-transparent focus-visible:text-gray-600'/>
      <button><Search className='absolute right-3 top-[10px]  w-5 h-5 '/></button>
    </form>
  )
}

export default SearchComponent
