import type { User } from '../../types/Users.types';
import UserCard from './UserCard';

interface UsersGridProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export default function UsersGrid({ users, onEdit, onDelete }: UsersGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
