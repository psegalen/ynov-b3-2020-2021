import axios from "axios";

const config = {
  headers: {
    cfAccessKey: "75ca4ddbde8291858f35dfc4b8b75f7b45e40700",
    "Content-Type": "application/json",
  },
};

const apiHelper = {
  getTasks: async () => {
    const result = await axios.get(
      "https://todo.crudful.com/tasks?ordering=createdAt",
      config
    );
    return result.data.results;
  },
  createTask: async (title) => {
    const result = await axios.post(
      "https://todo.crudful.com/tasks",
      JSON.stringify({ title }),
      config
    );
    return result.data;
  },
  toggleTask: async (task) => {
    const result = await axios.patch(
      `https://todo.crudful.com/tasks/${task.id}`,
      JSON.stringify({ isCompleted: !task.isCompleted }),
      config
    );
    return result.data;
  },
  deleteTask: async (task) => {
    const result = await axios.delete(
      `https://todo.crudful.com/tasks/${task.id}`,
      config
    );
    return result.status === 204;
  },
};

export default apiHelper;
