package com.learnnow.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learnnow.pojo.Questions;

@Repository
public interface QuestionDao extends JpaRepository<Questions, Long> {
}
