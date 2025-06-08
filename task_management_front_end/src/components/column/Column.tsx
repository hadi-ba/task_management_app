import Task from "@/components/task/task";
import ViewTask from "@/components/view-task/ViewTask";
import type { ITask } from "@/types/ITask";
import { useState } from "react";
import ManageColumnDialog from "../dialogs/manage-column/ManageColumnDialog";

const Column = ({
  id,
  name,
  tasks,
}: {
  id: number;
  name: string;
  tasks: ITask[];
}) => {
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const [openEditColumnDialog, setOpenEditColumnDialog] = useState(false);

  return (
    <div className="space-y-6">
      {/* Column Name */}
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => setOpenEditColumnDialog(true)}
      >
        <div className="rounded-full bg-[#49C4E5] size-3.5"></div>
        <div className="heading-s text-medium-grey">{`${name} (${tasks.length})`}</div>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-5 min-w-72 ">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                setSelectedTask(task);
                setOpenTaskDialog(true);
              }}
            >
              <Task
                title={task.title}
                completedSubTasksNumber={
                  task?.subTasks?.filter((subTask) => subTask.completed)
                    ?.length ?? 0
                }
                subTasksNumber={task?.subTasks?.length ?? 0}
              />
            </div>
          ))
        ) : (
          <div className="min-w-72 rounded-md bg-gradient-to-t from-[#E9EFFA] to-[rgba(233,239,250,0.5)] dark:bg-[linear-gradient(180deg,rgba(43,44,55,0.25)_0%,rgba(43,44,55,0.125)_100%)] h-svh"></div>
        )}
      </div>
      {selectedTask && (
        <ViewTask
          taskId={selectedTask.id}
          open={openTaskDialog}
          setOpen={setOpenTaskDialog}
        />
      )}

      <ManageColumnDialog
        isEdit={true}
        open={openEditColumnDialog}
        setOpen={setOpenEditColumnDialog}
        columnId={id}
        columnName={name}
      />
    </div>
  );
};

export default Column;
