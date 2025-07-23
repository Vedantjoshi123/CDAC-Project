package com.learnnow.exception;

public class ApiException extends RuntimeException {
	public ApiException(String mesg) {
		super(mesg);
	}
}
