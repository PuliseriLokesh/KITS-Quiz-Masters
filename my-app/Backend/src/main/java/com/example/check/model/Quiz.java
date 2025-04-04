package com.example.check.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "quiz")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String heading; // Changed from 'title' to 'heading' to match frontend

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Integer timeLimit; // Time limit in minutes

    @JsonManagedReference
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    public Quiz() {
    }

    public Quiz(String heading, String username, List<Question> questions, Integer timeLimit) {
        this.heading = heading;
        this.username = username;
        this.questions = questions != null ? questions : new ArrayList<>();
        this.timeLimit = timeLimit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(Integer timeLimit) {
        this.timeLimit = timeLimit;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions != null ? questions : new ArrayList<>();
    }

    @Override
    public String toString() {
        return "Quiz [id=" + id + ", heading=" + heading + ", username=" + username + ", questions=" + questions + "]";
    }
}
