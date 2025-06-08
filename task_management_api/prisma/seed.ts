import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Board } from 'src/_gen/prisma-class/board';
import { BoardRelations } from 'src/_gen/prisma-class/board_relations';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.subTask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.column.deleteMany();
  await prisma.board.deleteMany();

  // Create boards
  const boardNames = ['Platform Launch', 'Marketing Plan', 'Roadmap'];
  const boards: (Board & BoardRelations)[] = [];

  for (const name of boardNames) {
    const board = await prisma.board.create({
      data: {
        name,
        columns: {
          create: generateColumns(),
        },
      },
      include: {
        columns: true,
      },
    });
    boards.push(board);
  }

  // For each column, create tasks
  for (const board of boards) {
    for (const column of board.columns) {
      const tasks = await prisma.task.createMany({
        data: generateTasks(column.id, 3), // Create 3 tasks per column
      });
    }
  }

  // Get all tasks and create subtasks for them
  const allTasks = await prisma.task.findMany();
  for (const task of allTasks) {
    await prisma.subTask.createMany({
      data: generateSubTasks(task.id, 2), // Create 2 subtasks per task
    });
  }

  console.log('Database has been seeded successfully!');
}

function generateColumns() {
  const columnNames = ['Todo', 'Doing', 'Done', 'Backlog'];
  return columnNames.map((name) => ({
    name,
  }));
}

function generateTasks(columnId: number, count: number) {
  return Array.from({ length: count }, () => ({
    title: faker.hacker.phrase().slice(0, 50),
    description: faker.lorem.sentences(1),
    columnId,
  }));
}

function generateSubTasks(taskId: number, count: number) {
  return Array.from({ length: count }, () => ({
    title: faker.hacker.verb() + ' ' + faker.hacker.noun(),
    completed: faker.datatype.boolean(),
    taskId,
  }));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });