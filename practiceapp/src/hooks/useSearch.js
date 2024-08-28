import { useState, useMemo } from 'react';

const useSearch = (data) => {
  const [searchTerm, setSearchTerm] = useState('');

  const search = useMemo(() => {
    return data.filter(item =>
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  return { search, setSearchTerm };
};

export default useSearch;
