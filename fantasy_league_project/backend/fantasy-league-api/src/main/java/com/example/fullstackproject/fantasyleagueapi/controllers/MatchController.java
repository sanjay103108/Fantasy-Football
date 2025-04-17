package com.example.fullstackproject.fantasyleagueapi.controllers;

import com.example.fullstackproject.fantasyleagueapi.services.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/match")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @GetMapping("/next")
    public String getNextMatchTime() {
        return matchService.getNextMatchTime();
    }
} 