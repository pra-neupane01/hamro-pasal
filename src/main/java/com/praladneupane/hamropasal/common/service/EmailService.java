package com.praladneupane.hamropasal.common.service;

import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final TemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.mail.alert-to}")
    private String alertToEmail;

    public void sendLowStockAlert(List<LowStockNotification> lowStockProducts) {
        if (lowStockProducts.isEmpty()) {
            log.info("No low-stock products found. Skipping alert email.");
            return;
        }

        try {
            Context context = new Context();
            context.setVariable("products", lowStockProducts);
            context.setVariable("totalProducts", lowStockProducts.size());

            String htmlContent = templateEngine.process("low-stock-alert", context);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(alertToEmail);
            helper.setSubject("⚠️ Low Stock Alert – " + lowStockProducts.size() + " product(s) need restocking");
            helper.setText(htmlContent, true);

            javaMailSender.send(mimeMessage);
            log.info("Low-stock alert email sent to {} for {} product(s).", alertToEmail, lowStockProducts.size());

        } catch (MessagingException e) {
            log.error("Failed to send low-stock alert email: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send low-stock alert email", e);
        }
    }
}

