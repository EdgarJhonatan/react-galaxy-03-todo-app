import { useState } from "react";
import "./App.css";

const DEFAULT_TASKS = [
   { id: 1, name: "Tarea 1", complete: false },
   { id: 2, name: "Tarea 2", complete: false },
];

function App() {
   const [tasks, setTasks] = useState(DEFAULT_TASKS);
   const [taskSelected, setTaskSelected] = useState();
   const [inputTask, setInputTask] = useState("");

   const addTask = (task) => {
      const newTask = {
         id: tasks.length + 1,
         name: task,
         complete: false,
      };
      setTasks((items) => [...items, newTask]);
   };

   const updateTask = (id, updateTask) => {
      setTasks((items) => {
         return items.map((item) => {
            if (item.id === id) {
               return { ...item, ...updateTask };
            }
            return item;
         });
      });
   };

   const removeTask = (id) => {
      setTasks((items) => {
         return items.filter((item) => item.id !== id);
      });
   };

   const toogleComplete = (id, complete) => {
      updateTask(id, { complete });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (!inputTask) return;
      addTask(inputTask);
      setInputTask("");
   };

   const confirmUpdateTask = (id) => {
      updateTask(id, { name: taskSelected.name });
      setTaskSelected(undefined);
   };

   return (
      <div>
         <form onSubmit={onSubmit}>
            <input
               type="text"
               value={inputTask}
               onChange={(e) => setInputTask(e.target.value)}
            />
         </form>
         <ul>
            {tasks.map((task) =>
               task.id === taskSelected?.id ? (
                  <li key={task.id}>
                     <input
                        type="text"
                        value={taskSelected.name}
                        onChange={(e) =>
                           setTaskSelected((oldTask) => ({
                              ...oldTask,
                              name: e.target.value,
                           }))
                        }
                     />
                     <button
                        onClick={() => confirmUpdateTask(task.id)}>
                        Guardar
                     </button>
                     <button
                        onClick={() => setTaskSelected(undefined)}>
                        Cancelar
                     </button>
                  </li>
               ) : (
                  <li key={task.id}>
                     <input
                        type="checkbox"
                        checked={task.complete}
                        onChange={(e) =>
                           toogleComplete(task.id, e.target.checked)
                        }
                     />
                     <span>{task.name}</span>
                     <button onClick={() => setTaskSelected(task)}>
                        Editar
                     </button>
                     <button onClick={() => removeTask(task.id)}>
                        Eliminar
                     </button>
                  </li>
               )
            )}
         </ul>
      </div>
   );
}

export default App;
