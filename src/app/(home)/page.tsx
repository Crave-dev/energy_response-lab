import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

export default function Home() {
  return (
      <main className="bg-white min-h-[100dvh] pt-8 px-4">
        <h1 className="font-bold text-5xl text-center">Energy Response Lab</h1>
        <h2 className="font-semibold text-4xl text-center">TODO</h2>
        <TodoForm />
        <TodoList />
      </main>
     );
}
