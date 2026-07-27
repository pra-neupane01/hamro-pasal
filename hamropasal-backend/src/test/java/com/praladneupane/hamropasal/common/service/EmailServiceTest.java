package com.praladneupane.hamropasal.common.service;

import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private EmailService emailService;

    @Test
    void sendLowStockAlert_shouldComposeExpectedEmail() {
        List<LowStockNotification> notifications = List.of(
                new LowStockNotification(1L, "Rice", "SKU-1", 3, 10),
                new LowStockNotification(2L, "Sugar", "SKU-2", 2, 5)
        );

        emailService.sendLowStockAlert(notifications);

        ArgumentCaptor<SimpleMailMessage> mailCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(mailCaptor.capture());

        SimpleMailMessage message = mailCaptor.getValue();
        assertArrayEquals(new String[]{"admin@hamropasal.com"}, message.getTo());
        assertEquals("Low Stock Alert - Hamropasal", message.getSubject());
        assertTrue(message.getText().contains("Rice: 3 units (Threshold: 10)"));
        assertTrue(message.getText().contains("Sugar: 2 units (Threshold: 5)"));
    }

    @Test
    void sendOrderConfirmation_shouldComposeExpectedEmail() {
        emailService.sendOrderConfirmation("customer@gmail.com", "Order #123");

        ArgumentCaptor<SimpleMailMessage> mailCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(mailCaptor.capture());

        SimpleMailMessage message = mailCaptor.getValue();
        assertArrayEquals(new String[]{"customer@gmail.com"}, message.getTo());
        assertEquals("Order Confirmation - Hamropasal", message.getSubject());
        assertEquals("Thank you for your order!\n\nOrder #123", message.getText());
    }
}
