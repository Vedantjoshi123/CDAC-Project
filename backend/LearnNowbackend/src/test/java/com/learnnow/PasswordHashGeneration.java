package com.learnnow;

import java.util.Base64;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class PasswordHashGeneration {

	public static void main(String[] args) {
		  byte[] key = Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded();
	        String base64Key = Base64.getEncoder().encodeToString(key);
	        System.out.println(base64Key);
	}

}
