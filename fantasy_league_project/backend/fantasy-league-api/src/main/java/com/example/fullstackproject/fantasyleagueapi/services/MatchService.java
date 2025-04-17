package com.example.fullstackproject.fantasyleagueapi.services;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class MatchService {
    
    private static final int LOCKOUT_HOURS = 2;

    public boolean isTeamLocked(LocalDateTime matchTime) {
        LocalDateTime now = LocalDateTime.now();
        long hoursUntilMatch = ChronoUnit.HOURS.between(now, matchTime);
        return hoursUntilMatch <= LOCKOUT_HOURS;
    }

    public String getNextMatchTime() {
        // This is a placeholder - you should implement this based on your match schedule
        // For now, we'll return a hardcoded time 3 hours from now for testing
        return LocalDateTime.now().plusHours(3).toString();
    }
} 