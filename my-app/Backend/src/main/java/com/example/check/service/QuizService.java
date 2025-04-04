package com.example.check.service;

import java.util.List;
import java.util.Optional;

import com.example.check.model.Question;
import com.example.check.model.Quiz;
import com.example.check.model.Score;

public interface QuizService {

    /**
     * Retrieves all quizzes present in the system.
     *
     * @return a list of all quizzes
     */
    List<Quiz> getAllQuizzes();

    /**
     * Creates a new quiz and associates it with the given username.
     *
     * @param quiz the quiz to create
     * @param username the username of the user creating the quiz
     * @return the created quiz
     */
    Quiz createQuiz(Quiz quiz, String username);

    /**
     * Deletes a quiz by its ID.
     *
     * @param id the ID of the quiz to delete
     * @return a message indicating the result of the deletion
     */
    String deleteQuiz(Long id);

    /**
     * Adds a question to a quiz identified by the given ID.
     *
     * @param quizId the ID of the quiz to add the question to
     * @param question the question to add
     * @return a message indicating the result of the operation
     */
    String AddAQuestion(Long quizId, Question question);

    /**
     * Removes a specific question from a quiz.
     *
     * @param quizId the ID of the quiz containing the question
     * @param questionId the ID of the question to remove
     * @return true if the question was removed, false otherwise
     */
    boolean removeQuestion(Long quizId, Long questionId);

    /**
     * Updates an existing question with new details.
     *
     * @param questionId the ID of the question to update
     * @param updatedQuestion the updated question details
     * @return true if the question was updated, false otherwise
     */
    boolean updateQuestion(Long questionId, Question updatedQuestion);

    /**
     * Retrieves all questions for a quiz identified by the given ID.
     *
     * @param quizId the ID of the quiz
     * @return an Optional containing the quiz with its questions, or empty if not found
     */
    Optional<Quiz> GetAllQuestions(Long quizId);

    /**
     * Adds a score entry for a quiz.
     *
     * @param score the score to add
     * @return a message indicating the result of the operation
     */
    String addScore(Score score);

    /**
     * Retrieves all scores in the system.
     *
     * @return a list of all scores
     */
    List<Score> getAllScores();

    /**
     * Retrieves scores for a specific user.
     *
     * @param username the username of the user
     * @return a list of scores for the user
     */
    List<Score> getScoresByUsername(String username);

    /**
     * Retrieves scores for a specific quiz by its name.
     *
     * @param quizName the name of the quiz
     * @return a list of scores for the quiz
     */
    List<Score> getScoresForQuiz(String quizName);

    /**
     * Retrieves scores for a specific quiz by its ID.
     *
     * @param quizId the ID of the quiz
     * @return a list of scores for the quiz
     */
    List<Score> getScoresByQuizId(Long quizId);

    List<Score> ScoreForAQuiz(String quizname);

    /**
     * Deletes all scores for a given quiz by its name.
     *
     * @param quizName the name of the quiz
     * @return a message indicating the result of the deletion
     */
    String deleteScoresByQuizName(String quizName);
}