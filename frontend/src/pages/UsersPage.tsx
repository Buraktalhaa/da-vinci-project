import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserForm from '../components/users/UserForm';
import UsersGrid from '../components/users/UsersGrid';
import type { User, CreateUserData } from '../types/Users.types';
import { useUsers } from '../hooks/useUsers';
import DeleteUserModal from '@/components/users/DeleteUserModal';

export default function UsersPage() {
  const { users, loading, createUser, updateUser, deleteUser } = useUsers();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCreateUser = async (userData: CreateUserData) => {
    await createUser(userData);
    setShowForm(false);
  };

  const handleUpdateUser = async (userData: CreateUserData) => {
    if (!editingUser) return;
    await updateUser(editingUser.id, userData);
    setEditingUser(null);
    setShowForm(false);
  };

  // Form ekranı
  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => { setShowForm(false); setEditingUser(null); }}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Users
          </Button>
          <UserForm
            user={editingUser || undefined}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onCancel={() => { setShowForm(false); setEditingUser(null); }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="relative mb-8">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 text-center">
            <h1 className="text-xl font-bold">Users Management</h1>
            <p className="text-muted-foreground">Manage users with full CRUD operations</p>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Home
              </Button>
            </Link>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" /> Add User
            </Button>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Kullanıcı Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading users...</p>
        ) : users.length > 0 ? (
          <UsersGrid
            users={users}
            onEdit={(user) => { setEditingUser(user); setShowForm(true); }}
            onDelete={(id) => { setDeletingUserId(id); setShowDeleteModal(true); }}
          />
        ) : (
          <p className="text-center text-muted-foreground">No users found. Add one!</p>
        )}

        {/* Delete Modal */}
        {showDeleteModal && deletingUserId && (
          <DeleteUserModal
            message="Are you sure you want to delete this user?"
            onConfirm={async () => {
              await deleteUser(deletingUserId);
              setShowDeleteModal(false);
              setDeletingUserId(null);
            }}
            onCancel={() => {
              setShowDeleteModal(false);
              setDeletingUserId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
