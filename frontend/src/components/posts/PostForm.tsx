import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '../ui/form';
import { usePosts } from '../../hooks/usePosts';

const createPostSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  title: z.string().max(50, 'Title must be at most 50 characters'),
  body: z.string().max(200, 'Body must be at most 200 characters'),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

interface PostFormProps {
  users: { id: string; name: string }[];
  post?: { id: string; userId: string; title: string; body: string }; // <- burayı ekledik
  onCancel: () => void;
  onSuccess: () => void;
}

export default function PostForm({ users, post, onCancel, onSuccess }: PostFormProps) {
  const { createPost, saveEdit } = usePosts();

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      userId: post?.userId || '',
      title: post?.title || '',
      body: post?.body || '',
    },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    if (post) {
      // Edit modu
      await saveEdit(post.id, data);
    } else {
      // Create modu
      await createPost(data.userId, data.title, data.body);
    }
    form.reset();
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto mb-6 p-4 border rounded-lg shadow-sm">
        <FormDescription>{post ? 'Edit post' : 'Create a new post'}</FormDescription>

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                <select {...field} className="border rounded p-2 w-full">
                  <option value="">Select User</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Input placeholder="Enter body" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="submit" className="flex-1">{post ? 'Save Changes' : 'Create Post'}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}
