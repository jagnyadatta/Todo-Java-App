package com.jagnya.MultiuserTodo.service;

import com.jagnya.MultiuserTodo.dto.request.TodoRequest;
import com.jagnya.MultiuserTodo.dto.response.ApiResponse;
import com.jagnya.MultiuserTodo.dto.response.TodoResponse;
import com.jagnya.MultiuserTodo.entity.Todo;
import com.jagnya.MultiuserTodo.entity.User;
import com.jagnya.MultiuserTodo.repository.TodoRepository;
import com.jagnya.MultiuserTodo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {
    private TodoResponse mapToResponse(Todo todo) {
        TodoResponse response = new TodoResponse();
        response.setId(todo.getId());
        response.setDescription(todo.getDescription());
        response.setCompleted(todo.isCompleted());
        response.setCreatedAt(todo.getCreatedAt());
        response.setUpdatedAt(todo.getUpdatedAt());
        return response;
    }

    @Autowired
    private TodoRepository todoRepo;

    @Autowired
    private UserRepository userRepo;

    public ApiResponse<TodoResponse> addTodo(TodoRequest request, Integer userId){
        User user = userRepo.findById(userId).orElse(null);

        if (user == null) {
            return new ApiResponse<>("User not found!", null);
        }

        Todo todo = new Todo();
        todo.setDescription(request.getDescription());
        todo.setCompleted(false);   // Default value
        todo.setUser(user);

        Todo savedTodo = todoRepo.save(todo);

        return new ApiResponse<>("Todo added!", mapToResponse(savedTodo));
    }

    public ApiResponse<List<TodoResponse>> getTodos(Integer userId) {
        User user = userRepo.findById(userId).orElse(null);

        if (user == null) {
            return new ApiResponse<>("User not found!", null);
        }

        List<Todo> todos = todoRepo.findByUserId(userId);
        List<TodoResponse> responseList = new ArrayList<>();

        for (Todo todo : todos) {
            responseList.add(mapToResponse(todo));
        }

        return new ApiResponse<>("Todos fetched successfully!", responseList);
    }

    public ApiResponse<TodoResponse> getTodo(Integer userId, Integer todoId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return new ApiResponse<>("User not found!", null);
        }
        Todo todo = todoRepo.findByIdAndUserId(todoId, userId).orElse(null);

        if (todo == null) {
            return new ApiResponse<>("Todo not found!", null);
        }

        return new ApiResponse<>("Todo fetched successfully!", mapToResponse(todo));
    }

    public ApiResponse<TodoResponse> updateTodo(Integer userId, Integer todoId, TodoRequest request) {
        User user = userRepo.findById(userId).orElse(null);

        if (user == null) {
            return new ApiResponse<>("User not found!", null);
        }

        Todo todo = todoRepo.findByIdAndUserId(todoId, userId).orElse(null);

        if (todo == null) {
            return new ApiResponse<>("Todo not found!", null);
        }

        todo.setDescription(request.getDescription());
        todo.setCompleted(request.isCompleted());

        Todo updatedTodo = todoRepo.save(todo);

        return new ApiResponse<>("Todo updated successfully!", mapToResponse(updatedTodo));
    }

    public ApiResponse<Void> deleteTodo(Integer userId, Integer todoId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return new ApiResponse<>("User not found!", null);
        }
        Todo todo = todoRepo.findByIdAndUserId(todoId, userId).orElse(null);
        if (todo == null) {
            return new ApiResponse<>("Todo not found!", null);
        }
        todoRepo.delete(todo);
        return new ApiResponse<>("Todo deleted successfully!", null);
    }

}
