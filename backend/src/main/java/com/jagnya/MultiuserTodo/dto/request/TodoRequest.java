package com.jagnya.MultiuserTodo.dto.request;

import lombok.Data;

@Data
public class TodoRequest {

    private String description;
    private boolean isCompleted;

}