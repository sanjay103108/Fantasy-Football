package com.example.fullstackproject.fantasyleagueapi.services;

import com.example.fullstackproject.fantasyleagueapi.models.Player;
import com.example.fullstackproject.fantasyleagueapi.models.User;
import com.example.fullstackproject.fantasyleagueapi.repositories.PlayerRepository;
import com.example.fullstackproject.fantasyleagueapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    MatchService matchService;

    public List<User> getAllUsers(){
        logger.info("Fetching all users from database");
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        logger.info("Fetching user by email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    public User addNewUser(User user){
        logger.info("Attempting to add new user with email: {}", user.getEmail());
        
        // Check if user already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            logger.warn("User with email {} already exists", user.getEmail());
            throw new RuntimeException("Email already exists");
        }
        
        user.setTransferBudget(100.00F);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(user.getPassword());
        user.setPassword(password);
        
        User savedUser = userRepository.save(user);
        logger.info("Successfully saved new user with ID: {}", savedUser.getUserId());
        return savedUser;
    }

    public void removeUser(Long id){
        logger.info("Attempting to remove user with ID: {}", id);
        userRepository.deleteById(id);
        logger.info("Successfully removed user with ID: {}", id);
    }

    public void addPlayerToUser(Long playerId, Long userId) {
        logger.info("Adding player {} to user {}", playerId, userId);
        
        // Check if team is locked
        LocalDateTime nextMatchTime = LocalDateTime.parse(matchService.getNextMatchTime());
        if (matchService.isTeamLocked(nextMatchTime)) {
            throw new RuntimeException("Team changes are locked 2 hours before match time");
        }

        User targetUser = userRepository.findById(userId).get();
        Player targetPlayer = playerRepository.findById(playerId).get();
        List<Player> playerList = targetUser.getPlayers();
        playerList.add(targetPlayer);
        targetUser.setPlayers(playerList);
        updateTransferBudget(userId);
        userRepository.save(targetUser);
        logger.info("Successfully added player {} to user {}", playerId, userId);
    }

    public void removePlayerFromUser(Long playerId, Long userId) {
        logger.info("Removing player {} from user {}", playerId, userId);
        
        // Check if team is locked
        LocalDateTime nextMatchTime = LocalDateTime.parse(matchService.getNextMatchTime());
        if (matchService.isTeamLocked(nextMatchTime)) {
            throw new RuntimeException("Team changes are locked 2 hours before match time");
        }

        User targetUser = userRepository.findById(userId).get();
        Player targetPlayer = playerRepository.findById(playerId).get();
        List<Player> playerList = targetUser.getPlayers();
        playerList.remove(targetPlayer);
        targetUser.setPlayers(playerList);
        addToTransferBudget(userId, targetPlayer);
        userRepository.save(targetUser);
        logger.info("Successfully removed player {} from user {}", playerId, userId);
    }
    
    public User findUserById(Long userId){
        logger.info("Finding user by ID: {}", userId);
        return userRepository.findById(userId).orElse(null);
    }

    public void updateTransferBudget(Long userId){
        logger.info("Updating transfer budget for user: {}", userId);
        float spentBudget = 0;
        User targetUser = userRepository.findById(userId).get();
        for (Player player:targetUser.getPlayers()){
            spentBudget += player.getTransferValue()/10;
        }
        float currentBudget = targetUser.getTransferBudget();
        targetUser.setTransferBudget(currentBudget-spentBudget);
        userRepository.save(targetUser);
        logger.info("Successfully updated transfer budget for user: {}", userId);
    }

    public void addToTransferBudget(Long userId, Player targetPlayer){
        logger.info("Adding to transfer budget for user: {}", userId);
        float spentBudget = 0;
        User targetUser = userRepository.findById(userId).get();
        Player removedPlayer = playerRepository.findById(targetPlayer.getId()).get();

        float currentBudget = targetUser.getTransferBudget();
        targetUser.setTransferBudget(currentBudget + removedPlayer.getTransferValue()/10);
        userRepository.save(targetUser);
        logger.info("Successfully added to transfer budget for user: {}", userId);
    }
}
