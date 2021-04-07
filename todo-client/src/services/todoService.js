import { apiUrl } from "../config";
import http from "./httpService";

class TodoService {

  async getTodo(todoId) {
      return (await http.get(`${apiUrl}/todos/${todoId}`)).data;
  }

  deleteTodo(todoId) {
      return http.delete(`${apiUrl}/todos/${todoId}`);
  }

  editTodo(todo) {
      const todoId = todo._id;
      delete todo._id;
      return http.post(`${apiUrl}/todos/update/${todoId}`,todo);
  }

  async getMyTodos() {
      return (await http.get(`${apiUrl}/todos/mytodos`)).data;
  }

  createTodo(todo) {
      return http.post(`${apiUrl}/todos/add`,todo);
  }

  async searchTodos(filter) {
    return (await http.post(`${apiUrl}/todos/search`,filter)).data;
  }

  addToFavorites(todoId) {
    return http.post(`${apiUrl}/favorites/${todoId}`);
  }

  async removeFromFavorites(todoId) {
    return await http.delete(`${apiUrl}/favorites/${todoId}`);
  }

  async favoritesList() {
    return (await http.get(`${apiUrl}/favorites/list`)).data;
  }


}

const todoService = new TodoService();
export default todoService;

