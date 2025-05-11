import type React from 'react';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logAnalyticsEvent } from '../lib/firebase';
import { Input } from './ui/input';

export function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      logAnalyticsEvent('search', { search_term: query });
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className='relative w-full'>
      <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Etkinlik, takım veya lig ara...'
        className='w-full pl-8'
        value={query}
        onChange={(e: React.FormEvent) => setQuery(e.target.value)}
      />
    </form>
  );
}
