package com.praladneupane.hamropasal.common.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
@Getter
@Setter
public class AppConfig {
    private Jwt jwt;

    @Getter
    @Setter
    public static class  Jwt {
        private Long expiry;
        private String secret;
    }

}
