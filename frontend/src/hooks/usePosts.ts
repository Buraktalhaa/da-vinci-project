import { useState, useEffect } from 'react';
import { GetRequest, PostRequest, PutRequest, DeleteRequest } from '../api/requests';
import type { Post } from '@/types/Posts.types';
import { toast } from 'sonner';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await GetRequest({ endpoint: '/posts' });
      setPosts(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching posts');
      toast.error(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (userId: string, title: string, body: string) => {
    try {
      await PostRequest({ endpoint: '/posts', body: { userId, title, body } });
      await fetchPosts(); // backend’den tekrar verileri al
      toast.success('Post created successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create post');
    }
  };

  const saveEdit = async (id: string, data: { userId: string; title: string; body: string }) => {
    try {
      await PutRequest({ endpoint: `/posts/${id}`, body: data });
      await fetchPosts(); // backend’den tekrar veri al ve UI güncellensin
      toast.success('Post updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update post');
    }
  };

  const deletePost = async (id: string) => {
    try {
      await DeleteRequest({ endpoint: `/posts/${id}` });
      await fetchPosts(); // backend’den veri tekrar al
      toast.success('Post deleted successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, fetchPosts, createPost, saveEdit, deletePost };
}
