package com.learnnow.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class TeacherCantSendFeedbackException extends RuntimeException {

	public TeacherCantSendFeedbackException(String msg) {
		super(msg);
	}
}
