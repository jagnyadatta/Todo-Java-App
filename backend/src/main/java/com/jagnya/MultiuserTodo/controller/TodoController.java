package com.jagnya.MultiuserTodo.controller;

import com.jagnya.MultiuserTodo.dto.request.TodoRequest;
import com.jagnya.MultiuserTodo.dto.response.ApiResponse;
import com.jagnya.MultiuserTodo.dto.response.TodoResponse;
import com.jagnya.MultiuserTodo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins="http://localhost:5173/")
public class TodoController {
    @Autowired
    private TodoService service;

    @PostMapping("/{userId}")
    public ApiResponse<TodoResponse> addTodo(@RequestBody TodoRequest request, @PathVariable Integer userId){
        return service.addTodo(request, userId);
    }

    @GetMapping("/{userId}")
    public ApiResponse<List<TodoResponse>> getTodos(@PathVariable Integer userId){
        return service.getTodos(userId);
    }

    @GetMapping("/{userId}/{todoId}")
    public ApiResponse<TodoResponse> getTodo(@PathVariable Integer userId, @PathVariable Integer todoId){
        return service.getTodo(userId, todoId);
    }

    @PutMapping("/{userId}/{todoId}")
    public ApiResponse<TodoResponse> updateTodo(@PathVariable Integer userId, @PathVariable Integer todoId, @RequestBody TodoRequest request){
        return service.updateTodo(userId, todoId, request);
    }

    @DeleteMapping("/{userId}/{todoId}")
    public ApiResponse<Void> deleteTodo(@PathVariable Integer userId, @PathVariable Integer todoId){
        return service.deleteTodo(userId, todoId);
    }
}
