package com.praladneupane.hamropasal.common.service;

import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendLowStockAlert(List<LowStockNotification> lowStockProducts) {
        try {
            StringBuilder message = new StringBuilder("Low Stock Alert!\n\n");
            message.append("The following products are below their reorder level:\n\n");

            for (LowStockNotification product : lowStockProducts) {
                message.append(String.format("- %s: %d units (Threshold: %d)\n",
                        product.productName(),
                        product.currentValue(),
                        product.threshold()));
            }

            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo("admin@hamropasal.com");
            mail.setSubject("Low Stock Alert - Hamropasal");
            mail.setText(message.toString());

            mailSender.send(mail);
            log.info("Low stock alert email sent successfully");
        } catch (Exception e) {
            log.error("Failed to send low stock alert email", e);
        }
    }

    public void sendOrderConfirmation(String email, String orderDetails) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(email);
            mail.setSubject("Order Confirmation - Hamropasal");
            mail.setText("Thank you for your order!\n\n" + orderDetails);

            mailSender.send(mail);
            log.info("Order confirmation email sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send order confirmation email", e);
        }
    }
}
