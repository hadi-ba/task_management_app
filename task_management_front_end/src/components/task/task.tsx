const Task = ({
  title,
  subTasksNumber,
  completedSubTasksNumber,
}: {
  title: string;
  subTasksNumber: number;
  completedSubTasksNumber: number;
}) => {
  return (
    <div className="group cursor-pointer w-72 h-full bg-white dark:bg-dark-grey shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1015)] space-y-2 px-4 py-6 rounded-lg">
      <h1 className="heading-m text-black dark:text-white group-active:text-main-purple">
        {title}
      </h1>
      <h2 className="body-m text-medium-grey">{`${completedSubTasksNumber} of ${subTasksNumber} substasks`}</h2>
    </div>
  );
};

export default Task;
