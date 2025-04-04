package com.example.check.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.check.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Fetch all questions related to a specific quiz
    @Query("SELECT q FROM Question q WHERE q.quiz.id = :quizId")
    List<Question> findByQuizId(@Param("quizId") Long quizId);

    // Delete a question by ID (transactional for safe removal)
    @Transactional
    @Modifying
    @Query("DELETE FROM Question q WHERE q.id = :questionId")
    void deleteByQuestionId(@Param("questionId") Long questionId);

    // Update a question (only specific fields)
    @Transactional
    @Modifying
    @Query("UPDATE Question q SET q.question = :question, q.option1 = :option1, q.option2 = :option2, " +
           "q.option3 = :option3, q.option4 = :option4, q.answer = :answer WHERE q.id = :questionId")
    void updateQuestion(
        @Param("questionId") Long questionId,
        @Param("question") String question,
        @Param("option1") String option1,
        @Param("option2") String option2,
        @Param("option3") String option3,
        @Param("option4") String option4,
        @Param("answer") String answer
    );
}
