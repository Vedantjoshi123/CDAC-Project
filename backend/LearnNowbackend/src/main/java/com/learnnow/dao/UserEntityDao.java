package com.learnnow.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

import com.learnnow.pojo.UserEntity;
import com.learnnow.pojo.UserRole;

public interface UserEntityDao extends JpaRepository<UserEntity, Long>{
    Optional<UserEntity> findByIdAndIsActiveTrue(Long id);
    List<UserEntity> findByIsActiveTrue();
//    Optional<UserEntity> findByEmailAndIsActiveTrue(String email);
    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);
    
    
    @Query("select u.userRole from UserEntity u where u.id=:id")
    UserRole getUserRoleById(Long id);
}
