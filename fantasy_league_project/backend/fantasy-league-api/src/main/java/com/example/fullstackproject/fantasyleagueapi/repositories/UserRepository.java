package com.example.fullstackproject.fantasyleagueapi.repositories;

import com.example.fullstackproject.fantasyleagueapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    List<User> findByUserName(String userName);
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM users u WHERE u.email = :email AND u.password = :password")
    Optional<User> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM users u WHERE u.teamName = :teamName")
    List<User> findByTeamName(@Param("teamName") String teamName);
}
