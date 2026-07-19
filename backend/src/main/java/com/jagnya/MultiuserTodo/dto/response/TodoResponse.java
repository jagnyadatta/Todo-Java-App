package com.jagnya.MultiuserTodo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoResponse {

    private Integer id;
    private String description;
    private boolean isCompleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}