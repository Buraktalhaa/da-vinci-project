import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import { useUsers } from '../hooks/useUsers';
import PostForm from '../components/posts/PostForm';

export default function PostsPage() {
  const { posts, loading, deletePost, fetchPosts } = usePosts();
  const { users } = useUsers();
  
  const [showForm, setShowForm] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Form iptal edildiğinde
  const handleCancel = () => {
    setShowForm(false);
    setEditingPostId(null);
  };

  // Form başarılı şekilde submit edildiğinde
  const handleSuccess = async () => {
    await fetchPosts(); // Backend’den tekrar verileri al
    setShowForm(false);
    setEditingPostId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">

        {/* Header */}
        <div className="relative mb-8">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 text-center">
            <h1 className="text-xl font-bold">Posts Management</h1>
            <p className="text-muted-foreground">Manage posts and filter by users</p>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Home
              </Button>
            </Link>
            <Button onClick={() => { setEditingPostId(null); setShowForm(true); }} className="gap-2">
              <Plus className="w-4 h-4" /> Add Post
            </Button>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Form */}
        {showForm && (
          <PostForm
            users={users}
            post={posts.find(p => p.id === editingPostId) || undefined}
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        )}

        {/* Posts Grid */}
        {!showForm && (
          <>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {posts.map(post => (
                  <Card key={post.id} className="hover:shadow-lg transition border-border/50 flex flex-col h-full">
                    <CardHeader>
                      <div className="flex flex-col items-start">
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>User: {users.find(u => u.id === post.userId)?.name || 'Unknown'}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">{post.body}</CardContent>
                    <CardFooter className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPostId(post.id);
                          setShowForm(true);
                        }}
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}