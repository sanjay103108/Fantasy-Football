package com.example.fullstackproject.fantasyleagueapi.components;

import com.example.fullstackproject.fantasyleagueapi.models.Player;
import com.example.fullstackproject.fantasyleagueapi.models.User;
import com.example.fullstackproject.fantasyleagueapi.repositories.PlayerRepository;
import com.example.fullstackproject.fantasyleagueapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception{
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode("12345");
        User arjun = new User("Arjun","XI","arjun@test.com",password);
        User vikram = new User("Vikram","XI","vikram@test.com","12345");
        User aisha = new User("Aisha","XI","aisha@test.com","12345");
        User raj = new User("Raj","XI","raj@test.com","12345");
        User priya = new User("Priya","XI","priya@test.com","12345");
        User rohan = new User("Rohan","XI","rohan@test.com","12345");

        vikram.setGWScore(41);
        vikram.setOverallScore(540);

        aisha.setGWScore(64);
        aisha.setOverallScore(505);

        raj.setGWScore(45);
        raj.setOverallScore(506);

        priya.setGWScore(36);
        priya.setOverallScore(440);

        rohan.setGWScore(74);
        rohan.setOverallScore(291);

        userRepository.saveAll(Arrays.asList(arjun,vikram,aisha,raj,priya,rohan));

        Player player1 = new Player("Haaland",4,122.0F,"https://resources.premierleague.com/premierleague/photos/players/110x140/p223094.png",318);
        Player player2 = new Player("James",2,59.0F,"https://resources.premierleague.com/premierleague/photos/players/110x140/p225796.png",146);
        Player player3 = new Player("Ederson",1,54.0F,"https://resources.premierleague.com/premierleague/photos/players/110x140/p121160.png",307);
        Player player4 = new Player("De Bruyne",3,123.0F,"https://resources.premierleague.com/premierleague/photos/players/110x140/p61366.png",301);
        Player player5 = new Player("Kante",3,48.0F,"https://resources.premierleague.com/premierleague/photos/players/110x140/p116594.png",134);

        playerRepository.save(player1);
        playerRepository.save(player2);
        playerRepository.save(player3);
        playerRepository.save(player4);
        playerRepository.save(player5);

        arjun.addPlayerToUser(player1);
        arjun.addPlayerToUser(player2);
        arjun.addPlayerToUser(player3);
        arjun.addPlayerToUser(player4);
        arjun.addPlayerToUser(player5);

        arjun.setOverallScore(512);

        userRepository.save(arjun);
    }
}