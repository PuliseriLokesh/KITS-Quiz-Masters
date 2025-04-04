package com.example.check.serviceImpl;

import java.util.List;
import java.util.Optional;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.check.model.Question;
import com.example.check.model.Quiz;
import com.example.check.model.Score;
import com.example.check.repository.QuestionRepository;
import com.example.check.repository.QuizRepository;
import com.example.check.repository.ScoreRepository;
import com.example.check.service.QuizService;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @Override
    public List<Quiz> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        quizzes.forEach(q -> System.out.println("Quiz: " + q.getHeading() + ", ID: " + q.getId()));
        return quizzes;
    }

    @Override
    @Transactional
    public Quiz createQuiz(Quiz quiz, String username) {
        if (quiz.getHeading() == null || quiz.getHeading().trim().isEmpty()) {
            throw new RuntimeException("Quiz title cannot be empty!");
        }

        quiz.setUsername(username);
        Quiz savedQuiz = quizRepository.save(quiz); // Save the quiz first

        // ✅ Ensure questions are saved with the correct quiz reference
        if (quiz.getQuestions() != null && !quiz.getQuestions().isEmpty()) {
            for (Question question : quiz.getQuestions()) {
                question.setQuiz(savedQuiz); // Ensure quiz ID is linked
                questionRepository.save(question); // Explicitly save each question
            }
        }

        return savedQuiz;
    }

    @Override
    @Transactional
    public String deleteQuiz(Long id) {
        if (!quizRepository.existsById(id)) {
            return "Quiz with this ID does not exist.";
        }
        quizRepository.deleteById(id);
        return "Quiz deleted successfully.";
    }

    @Override
    @Transactional
    public String AddAQuestion(Long quizId, Question request) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found with ID: " + quizId));

        request.setQuiz(quiz);
        questionRepository.save(request);
        return "Question added successfully.";
    }

    @Override
    @Transactional
    public boolean removeQuestion(Long quizId, Long questionId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isPresent()) {
            Quiz quiz = quizOptional.get();

            boolean removed = quiz.getQuestions().removeIf(q -> q.getId().equals(questionId));
            if (removed) {
                quizRepository.save(quiz);
                questionRepository.deleteById(questionId);
                System.out.println("✅ Question " + questionId + " deleted successfully.");
                return true;
            }
        }
        System.out.println("❌ Question " + questionId + " not found.");
        return false;
    }

    @Override
    @Transactional
    public boolean updateQuestion(Long questionId, Question updatedQuestion) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);

        if (questionOptional.isPresent()) {
            Question existingQuestion = questionOptional.get();

            // Update all fields
            existingQuestion.setQuestion(updatedQuestion.getQuestion());
            existingQuestion.setOption1(updatedQuestion.getOption1());
            existingQuestion.setOption2(updatedQuestion.getOption2());
            existingQuestion.setOption3(updatedQuestion.getOption3());
            existingQuestion.setOption4(updatedQuestion.getOption4());
            existingQuestion.setAnswer(updatedQuestion.getAnswer());

            // Save the updated question
            questionRepository.save(existingQuestion);
            System.out.println("✅ Question " + questionId + " updated successfully.");
            return true;
        } else {
            System.out.println("❌ Question " + questionId + " not found.");
            return false;
        }
    }

    @Override
    public Optional<Quiz> GetAllQuestions(Long quizId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        quiz.ifPresent(q -> {
            System.out.println("Quiz found: " + q.getHeading());
            q.getQuestions().forEach(question -> System.out
                    .println("Question ID: " + question.getId() + " - " + question.getQuestion()));
        });
        return quiz;
    }

    @Override
    @Transactional
    public String addScore(Score score) {
        if (score.getScore() < 0) {
            throw new RuntimeException("Score cannot be negative: " + score.getScore());
        }
        // Save every attempt as a new record
        scoreRepository.save(score);
        System.out.println("✅ Score added: " + score);
        return "Score has been added for the quiz.";
    }

    @Override
    public List<Score> getAllScores() {
        List<Score> scores = scoreRepository.findAll();
        System.out.println("Retrieved all scores: " + scores);
        return scores;
    }

    @Override
    public List<Score> getScoresByUsername(String username) {
        List<Score> scores = scoreRepository.findByUsername(username);
        System.out.println("Retrieved scores for user " + username + ": " + scores);
        return scores;
    }

    @Override
    public List<Score> getScoresForQuiz(String quizName) {
        List<Score> scores = scoreRepository.findByQuizname(quizName);
        System.out.println("Retrieved scores for quiz " + quizName + ": " + scores);
        return scores;
    }

    @Override
    public List<Score> getScoresByQuizId(Long quizId) {
        List<Score> scores = scoreRepository.findByQuizId(quizId);
        System.out.println("Retrieved scores for quiz ID " + quizId + ": " + scores);
        return scores;
    }

    @Override
    public List<Score> ScoreForAQuiz(String quizname) {
        return scoreRepository.findByQuizname(quizname);
    }

    @Override
    @Transactional
    public String deleteScoresByQuizName(String quizName) {
        List<Score> scores = scoreRepository.findByQuizname(quizName);
        if (scores.isEmpty()) {
            return "No scores found for quiz: " + quizName;
        }
        scoreRepository.deleteByQuizname(quizName);
        return "All scores for " + quizName + " deleted successfully.";
    }
}
