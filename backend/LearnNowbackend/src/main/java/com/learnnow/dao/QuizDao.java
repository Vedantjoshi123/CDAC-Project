package com.learnnow.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learnnow.pojo.Quiz;

@Repository
public interface QuizDao extends JpaRepository<Quiz, Long> {
}
