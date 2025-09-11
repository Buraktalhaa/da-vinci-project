import { useState, useEffect } from 'react';
import type { User, CreateUserData } from '@/types/Users.types';
import { GetRequest, PostRequest, PutRequest, DeleteRequest } from '../api/requests';
import { toast } from 'sonner';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await GetRequest({ endpoint: '/users' });
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error fetching users');
      toast.error(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: CreateUserData) => {
    try {
      await PostRequest({ endpoint: '/users', body: userData });
      await fetchUsers();
      toast.success('User created successfully');
    } catch (err: any) {
      setError(err.message || 'Error creating user');
      toast.error(err.message || 'Failed to create user');
    }
  };

  const updateUser = async (id: string, userData: CreateUserData) => {
    try {
      await PutRequest({ endpoint: `/users/${id}`, body: userData });
      await fetchUsers();
      toast.success('User updated successfully');
    } catch (err: any) {
      setError(err.message || 'Error updating user');
      toast.error(err.message || 'Failed to update user');
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await DeleteRequest({ endpoint: `/users/${id}` });
      await fetchUsers();
      toast.success('User deleted successfully');
    } catch (err: any) {
      setError(err.message || 'Error deleting user');
      toast.error(err.message || 'Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, createUser, updateUser, deleteUser };
}
