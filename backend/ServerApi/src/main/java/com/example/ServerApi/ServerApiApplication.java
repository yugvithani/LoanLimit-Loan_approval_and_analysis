package com.example.ServerApi;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApiApplication {

	public static void main(String[] args) {

		System.setProperty("DATABASE_URI", System.getenv("DATABASE_URI"));
		System.setProperty("DATABASE_USERNAME", System.getenv("DATABASE_USERNAME"));
		System.setProperty("DATABASE_PASSWORD", System.getenv("DATABASE_PASSWORD"));
		System.setProperty("MAIL_ADDRESS", System.getenv("MAIL_ADDRESS"));
		System.setProperty("MAIL_PASSWORD", System.getenv("MAIL_PASSWORD"));
		System.setProperty("SECRET_KEY", System.getenv("SECRET_KEY"));

		SpringApplication.run(ServerApiApplication.class, args);
	}

}
