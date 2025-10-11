import { z } from 'zod';

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

export const createPostSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  title: z.string().max(50, 'Title must be at most 50 characters'),
  body: z.string().max(200, 'Body must be at most 200 characters'),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export interface PostFormProps {
  users: { id: string; name: string }[];
  post?: { id: string; userId: string; title: string; body: string }; // <- burayı ekledik
  onCancel: () => void;
  onSuccess: () => void;
}