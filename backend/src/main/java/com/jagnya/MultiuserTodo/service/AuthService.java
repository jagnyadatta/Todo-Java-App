package com.jagnya.MultiuserTodo.service;

import com.jagnya.MultiuserTodo.dto.request.RegisterRequest;
import com.jagnya.MultiuserTodo.dto.response.ApiResponse;
import com.jagnya.MultiuserTodo.dto.response.UserResponse;
import com.jagnya.MultiuserTodo.entity.User;
import com.jagnya.MultiuserTodo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository repo;

    public ApiResponse<UserResponse> registerUser(RegisterRequest request) {

        if (repo.existsByEmail(request.getEmail())) {
            return new ApiResponse<>("User already exist!", null);
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User savedUser = repo.save(user);

        UserResponse response = new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
        return new ApiResponse<>("Registered Successfully", response);
    }

    public ApiResponse<UserResponse> loginUser(String email, String password) {
        User user = repo.findByEmail(email).orElse(null);

        if(user == null || !user.getPassword().equals(password)) {
            return new ApiResponse<>("Invalid Credential!", null);
        }

        UserResponse response = new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return new ApiResponse<>("Login Successful", response);
    }
}
