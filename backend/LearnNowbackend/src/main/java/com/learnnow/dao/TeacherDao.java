package com.learnnow.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.learnnow.pojo.Teacher;

@Repository
public interface TeacherDao extends JpaRepository<Teacher, Long> {
}
