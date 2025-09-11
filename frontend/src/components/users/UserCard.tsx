import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { User as UserIcon, Mail, Edit, Trash2 } from 'lucide-react';
import type { User } from '../../types/Users.types';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="hover:shadow-lg transition border-border/50 flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <UserIcon className="h-5 w-5 text-primary" />
          <div className="flex flex-col items-start">
            <CardTitle>{user.name}</CardTitle>
            <Badge variant="secondary">#{user.username}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 flex-1">
        <p className="flex items-center gap-1">
          <Mail className="w-4 h-4" /> {user.email}
        </p>
        <Separator />
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
            <Edit className="w-4 h-4" /> Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(user.id)} className="text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
