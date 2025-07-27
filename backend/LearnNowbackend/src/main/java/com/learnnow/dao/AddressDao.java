package com.learnnow.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnnow.pojo.Address;

public interface AddressDao extends JpaRepository<Address, Long> {

}
