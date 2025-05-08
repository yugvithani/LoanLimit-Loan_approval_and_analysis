package com.example.ServerApi;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApiApplication {

	public static void main(String[] args) {

//		System.setProperty("DATABASE_URI", System.getenv("DATABASE_URI"));
		System.setProperty("DB_HOST", System.getenv("DB_HOST"));
		System.setProperty("DB_PORT", System.getenv("DB_PORT"));
		System.setProperty("DB_DATABASE", System.getenv("DB_DATABASE"));
		System.setProperty("DB_USERNAME", System.getenv("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", System.getenv("DB_PASSWORD"));
		System.setProperty("MAIL_ADDRESS", System.getenv("MAIL_ADDRESS"));
		System.setProperty("MAIL_PASSWORD", System.getenv("MAIL_PASSWORD"));
		System.setProperty("SECRET_KEY", System.getenv("SECRET_KEY"));

		SpringApplication.run(ServerApiApplication.class, args);
	}

}
