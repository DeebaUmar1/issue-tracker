'use client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const FilterByUsers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: users, error, isLoading } = useUsers();

  const filterByUsers = (userId: string) => {
    const params = new URLSearchParams();
    if (userId && userId !== 'All') params.append('id', userId);
    if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!);
    if (searchParams.get('status')) params.append('status', searchParams.get('status')!);
    const query = params.size ? '?' + params.toString() : '';
    router.push(`/issues` + query);
  };

  return (
    <Suspense fallback={<div>Loading Users...</div>}>
      <Select.Root onValueChange={filterByUsers}>
        <Select.Trigger placeholder="Assigned To" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assigned To</Select.Label>
            <Select.Item value="All">All</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Suspense>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

export default FilterByUsers;
