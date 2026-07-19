package com.jagnya.MultiuserTodo.controller;

import com.jagnya.MultiuserTodo.dto.request.LoginRequest;
import com.jagnya.MultiuserTodo.dto.request.RegisterRequest;
import com.jagnya.MultiuserTodo.dto.response.ApiResponse;
import com.jagnya.MultiuserTodo.dto.response.UserResponse;
import com.jagnya.MultiuserTodo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="http://localhost:5173/")
public class AuthController {
    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(@RequestBody RegisterRequest request){
        return service.registerUser(request);
    }

    @PostMapping("/login")
    public ApiResponse<UserResponse> login(@RequestBody LoginRequest request){
        return service.loginUser(request.getEmail(), request.getPassword());
    }
}
