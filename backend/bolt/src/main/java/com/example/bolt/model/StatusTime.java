package com.example.bolt.model;

import lombok.Data;

@Data
public class StatusTime {
    private String placedTime;
    private String inPreparationTime;
    private String readyToDispathTime;
    private String dispatchedTime;
    private String deliveredTime;
    private String doneTime;

    public StatusTime(String placedTime) {
        this.placedTime = placedTime;
    }
}
