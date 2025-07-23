package com.learnnow.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.learnnow.dao.UserEntityDao;
import com.learnnow.pojo.UserEntity;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserEntityDao userEntityDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userEntityDao.findByEmailAndIsActiveTrue(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), Collections.emptyList());
    }
}
