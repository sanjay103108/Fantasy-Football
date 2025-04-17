package com.example.fullstackproject.fantasyleagueapi.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.example.fullstackproject.fantasyleagueapi.models.User;
import com.example.fullstackproject.fantasyleagueapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Controller
public class WebSocketController {

    @Autowired
    private UserService userService;

    @MessageMapping("/leaderboard")
    @SendTo("/topic/leaderboard")
    public List<User> getLeaderboard() {
        return userService.getAllUsers();
    }
} 