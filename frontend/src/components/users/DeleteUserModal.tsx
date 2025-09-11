import { Button } from '../ui/button';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export default function DeleteUserModal({ onConfirm, onCancel, message }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <p className="mb-4 text-gray-800 dark:text-gray-200">{message || "Are you sure?"}</p>
        <div className="flex justify-center gap-3">
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
