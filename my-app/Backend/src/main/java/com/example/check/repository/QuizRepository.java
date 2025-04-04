package com.example.check.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.check.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    // Find quizzes created by a specific username
    List<Quiz> findByUsername(String username);

    @EntityGraph(attributePaths = {"questions"})
    Optional<Quiz> findById(Long id);

    // Custom Query Example: Get quizzes with at least one question
    @Query("SELECT q FROM Quiz q WHERE SIZE(q.questions) > 0")
    List<Quiz> findQuizzesWithQuestions();

    @Query("SELECT q FROM Quiz q LEFT JOIN FETCH q.questions")  
    List<Quiz> findAllWithQuestions(); 
}
