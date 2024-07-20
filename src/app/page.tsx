const Home = () => {
  return (
    <div className="flex-1 p-6  h-screen overflow-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Todo App</h1>
      </div>
      <div>
        Simple Todo app. Here is{" "}
        <a
          href="https://github.com/tomruzicka/todo-app-nextjs"
          className="font-bold"
          target="_blank"
        >
          GitHub
        </a>{" "}
        link.
      </div>
    </div>
  );
};

export default Home;
