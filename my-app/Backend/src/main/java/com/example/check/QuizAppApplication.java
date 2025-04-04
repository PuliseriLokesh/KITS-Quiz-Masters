package com.example.check;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.check.model.ERole;
import com.example.check.model.Role;
import com.example.check.repository.RoleRepository;

@SpringBootApplication
public class QuizAppApplication implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(QuizAppApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_USER));
        }
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }
        if (roleRepository.findByName(ERole.ROLE_MODERATOR).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_MODERATOR));
        }
        System.out.println("✅ Default roles initialized!");
    }
}
