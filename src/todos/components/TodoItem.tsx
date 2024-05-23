import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";
import { toggleTodoStatus } from "../actions/todo-actions";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const [todoOptimistic, toggleTodoStatusOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodoStatusOptimistic = async () => {
    try {
      startTransition(() =>
        toggleTodoStatusOptimistic(!todoOptimistic.complete)
      );

      await toggleTodoStatus(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      return console.log("Error updating Todo status");
    }
  };

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => onToggleTodoStatusOptimistic()}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60${
            todoOptimistic.complete ? " bg-blue-100" : " bg-red-100"
          }`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
