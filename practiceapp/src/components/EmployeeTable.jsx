import React from 'react';

const EmployeeTable = ({ employees, setEmployees }) => {
  const handleEdit = (id, field, value) => {
    const updatedEmployees = employees.map(emp => {
      if (emp.id === id) {
        return { ...emp, [field]: value };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>
              <input
                value={emp.first_name}
                onChange={(e) => handleEdit(emp.id, 'name', e.target.value)}
              />
            </td>
            <td>
              <input
                value={emp.email}
                onChange={(e) => handleEdit(emp.id, 'email', e.target.value)}
              />
            </td>
            <td>{emp.gender}</td>
            <td>
              <input
                value={emp.salary}
                onChange={(e) => handleEdit(emp.id, 'salary', e.target.value)}
                type="number"
              />
            </td>
            <td>
              <button onClick={() => handleDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
