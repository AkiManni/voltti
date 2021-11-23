package com.example.bolt.model;

import lombok.Data;

@Data
public class StatusTiming {
    private String placedTime;
    private String inPreparationTime;
    private String readyToDispathTime;
    private String dispatchedTime;
    private String deliveredTime;
    private String doneTime;
    private String totalTime;


    public StatusTiming(String placedTime) {
        this.placedTime = placedTime;
    }
}
