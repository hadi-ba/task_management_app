import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
  onDelete: () => void;
}

const DeleteDialog = ({
  open,
  onOpenChange,
  title,
  content,
  onDelete,
}: DeleteDialogProps) => {
  const handleDelete = () => {
    onDelete();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white dark:bg-dark-grey rounded-[6px] space-y-6 p-6 sm:p-8 sm:pb-10 w-[340px] sm:w-[480px]"
        showCloseButton={false}
      >
        <div className="space-y-6">
          <h1 className="heading-l text-red">{title}</h1>
          <p className="text-gray-600 text-base leading-relaxed pt-2">
            {content}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button onClick={handleDelete} className="button-destructive w-full">
            Delete
          </button>
          <button onClick={handleCancel} className="button-secondary w-full">
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
