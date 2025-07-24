package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learnnow.dto.ContactUsRequestDTO;
import com.learnnow.dto.ContactUsResponseDTO;
import com.learnnow.service.ContactUsService;


import jakarta.validation.Valid;
@RestController
@RequestMapping("/contactus")
@CrossOrigin
public class ContactUsController {
	@Autowired
	private ContactUsService contactUsService;
	
	
	@PostMapping
	public ResponseEntity<?> addContactUs(@Valid @RequestBody ContactUsRequestDTO dto)
	{
		return ResponseEntity.ok(contactUsService.addContact(dto));
	}
	@GetMapping("/{id}")
	public ResponseEntity<?>getContactUsById(@PathVariable Long id)
	{
		return ResponseEntity.ok(contactUsService.getContactUsById(id));
	}
	@GetMapping
	public ResponseEntity<List<ContactUsResponseDTO>>getAllContact()
	{
		return ResponseEntity.ok(contactUsService.getContactUsAll());
	}
	
}
