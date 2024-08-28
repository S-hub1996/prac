import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable';
import SearchBar from './SearchBar';
import useSearch from '../hooks/useSearch';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // ascending by default
  const [genderFilter, setGenderFilter] = useState('');
  const { search, setSearchTerm } = useSearch(filteredEmployees);

  useEffect(() => {
    fetch('https://file.notion.so/f/f/3849cbaa-5010-40df-a27a-f34a3a69c598/ce7879ce-8dee-462f-9a6f-52a31ea104e5/MOCK_DATA.json?table=block&id=5766873f-14ad-4eba-9e97-7c51337fa118&spaceId=3849cbaa-5010-40df-a27a-f34a3a69c598&expirationTimestamp=1724932800000&signature=-VTniNu0eTH9JIU1WLevXrWSF4ySECMxn-F2lBMOznE&downloadName=MOCK_DATA.json')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        setFilteredEmployees(data);
      });
  }, []);

  const handleSort = () => {
    const sorted = [...filteredEmployees].sort((a, b) => {
      return sortOrder === 'asc'
        ? b.salary - a.salary
        : a.salary - b.salary;
    });
    setFilteredEmployees(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilter = (gender) => {
    setGenderFilter(gender);
    if (gender) {
      setFilteredEmployees(employees.filter(emp => emp.gender === gender));
    } else {
      setFilteredEmployees(employees);
    }
  };

  return (
    <div className="App">
      <SearchBar onSearch={setSearchTerm} />
      <button onClick={handleSort}>Sort by Salary ({sortOrder})</button>
      <select onChange={(e) => handleFilter(e.target.value)} value={genderFilter}>
        <option value="">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <EmployeeTable employees={search} setEmployees={setFilteredEmployees} />
    </div>
  );
};

export default App;
