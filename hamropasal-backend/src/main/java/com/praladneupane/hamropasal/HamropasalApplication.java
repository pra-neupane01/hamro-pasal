package com.praladneupane.hamropasal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HamropasalApplication {

	public static void main(String[] args) {
		SpringApplication.run(HamropasalApplication.class, args);
	}

}
