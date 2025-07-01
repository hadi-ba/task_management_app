import Column from "@/components/column/Column";
import ManageColumnDialog from "@/components/dialogs/manage-column/ManageColumnDialog";
import { useActiveBoard } from "@/providers/BoardProvider";
import { useState } from "react";

const BoardPage = () => {
  const { activeBoard } = useActiveBoard();

  const [openAddColumnDialog, setOpenAddColumnDialog] = useState(false);

  const content = () => {
    if (!activeBoard) {
      return (
        <div className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full mx-auto flex flex-col justify-center items-center gap-6 px-4">
          <h1 className="heading-l text-medium-grey text-center">
            Select a board from the list or create a new one to get started.
          </h1>
        </div>
      );
    } else if (activeBoard && activeBoard.columns.length === 0) {
      return (
        <div className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full mx-auto flex flex-col justify-center items-center gap-6 px-4">
          <h1 className="heading-l text-medium-grey text-center">
            This board is empty. Create a new column to get started.
          </h1>
          <button className="button-primary-l flex items-center justify-center rounded-3xl w-44">
            <h1
              className="heading-m text-white"
              onClick={() => {
                setOpenAddColumnDialog(true);
              }}
            >
              + Add New Column
            </h1>
          </button>
        </div>
      );
    } else {
      return (
        <div className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] flex gap-6 px-4 py-6 overflow-auto">
          {activeBoard?.columns?.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              name={column.name}
              tasks={column.tasks}
            />
          ))}
          <div
            onClick={() => {
              setOpenAddColumnDialog(true);
            }}
            className="active:text-main-purple cursor-pointer mt-9 min-w-72 flex justify-center items-center heading-xl text-medium-grey rounded-md bg-gradient-to-t from-[#E9EFFA] to-[rgba(233,239,250,0.5)] dark:bg-[linear-gradient(180deg,rgba(43,44,55,0.25)_0%,rgba(43,44,55,0.125)_100%)]  h-[calc(100vh-10rem)]"
          >
            + New Column
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {content()}
      <ManageColumnDialog
        open={openAddColumnDialog}
        setOpen={setOpenAddColumnDialog}
      />
    </div>
  );
};

export default BoardPage;
