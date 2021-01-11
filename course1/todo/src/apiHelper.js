import axios from "axios";

const config = {
  headers: {
    cfAccessKey: "75ca4ddbde8291858f35dfc4b8b75f7b45e40700",
    "Content-Type": "application/json",
  },
};

const apiHelper = {
  getTasks: async (listId) => {
    try {
      const result = await axios.get(
        `https://todo.crudful.com/tasks?ordering=createdAt&listId=${listId}`,
        config
      );
      return result.data.results;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  },
  createTask: async (title, listId) => {
    const result = await axios.post(
      "https://todo.crudful.com/tasks",
      JSON.stringify({ title, listId }),
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
  getLists: async () => {
    const result = await axios.get(
      "https://todo.crudful.com/lists?ordering=createdAt",
      config
    );
    return result.data.results;
  },
  createList: async (title, color) => {
    const result = await axios.post(
      "https://todo.crudful.com/lists",
      JSON.stringify({ title, color }),
      config
    );
    return result.data;
  },
};

export default apiHelper;
