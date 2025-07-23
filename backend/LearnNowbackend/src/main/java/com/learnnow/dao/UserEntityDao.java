package com.learnnow.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnnow.pojo.UserEntity;

public interface UserEntityDao extends JpaRepository<UserEntity, Long>{
    Optional<UserEntity> findByIdAndIsActiveTrue(Long id);
    List<UserEntity> findByIsActiveTrue();
    Optional<UserEntity> findByEmailAndIsActiveTrue(String email);
    boolean existsByEmail(String email);
}
