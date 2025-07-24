package com.learnnow.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.learnnow.pojo.Student;

@Repository
public interface StudentDao extends JpaRepository<Student, Long> {
    boolean existsByEmail(String email);
}
