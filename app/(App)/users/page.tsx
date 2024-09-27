"use client";
import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API'ye istek at
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // API endpoint'inizin yolu
        const data = await response.json();
        if (!response.ok) {
          throw new Error (data.message);
        }

        setUsers(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      {users.length === 0 ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
