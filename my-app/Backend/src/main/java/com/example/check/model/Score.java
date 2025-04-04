package com.example.check.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"username", "quizId"}))
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private Long quizId; // Added to associate the score with a specific quiz
    private String quizname; // Added to store the quiz name for display purposes
    private long score;

    // Default constructor (required by JPA)
    public Score() {
    }

    // Parameterized constructor (optional, for convenience)
    public Score(String username, Long quizId, String quizname, long score) {
        this.username = username;
        this.quizId = quizId;
        this.quizname = quizname;
        this.score = score;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getQuizname() {
        return quizname;
    }

    public void setQuizname(String quizname) {
        this.quizname = quizname;
    }

    public long getScore() {
        return score;
    }

    public void setScore(long score) {
        this.score = score;
    }

    // toString method for better logging and debugging
    @Override
    public String toString() {
        return "Score{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", quizId=" + quizId +
                ", quizname='" + quizname + '\'' +
                ", score=" + score +
                '}';
    }
}