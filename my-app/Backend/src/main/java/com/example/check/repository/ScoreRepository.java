package com.example.check.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.check.model.Score;

public interface ScoreRepository extends JpaRepository<Score, Long> {
  List<Score> findByUsername(String username);
  List<Score> findByQuizname(String quizname);
  List<Score> findByQuizId(Long quizId);
  List<Score> findByUsernameAndQuizId(String username, Long quizId);
  @Modifying
  @Query("DELETE FROM Score s WHERE s.quizname = :quizname")
  void deleteByQuizname(String quizname);
}