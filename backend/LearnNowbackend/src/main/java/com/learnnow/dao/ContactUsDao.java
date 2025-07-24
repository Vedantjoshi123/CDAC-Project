package com.learnnow.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learnnow.pojo.ContactUs;
@Repository
public interface ContactUsDao extends JpaRepository<ContactUs, Long>{

}
