package com.praladneupane.hamropasal.common.config;

import com.praladneupane.hamropasal.auth.service.CustomUserDetailsService;
import com.praladneupane.hamropasal.customer.entity.Customer;
import com.praladneupane.hamropasal.customer.repository.CustomerRepository;
import com.praladneupane.hamropasal.inventory.entity.Inventory;
import com.praladneupane.hamropasal.inventory.repository.InventoryRepository;
import com.praladneupane.hamropasal.product.entity.Category;
import com.praladneupane.hamropasal.product.entity.Product;
import com.praladneupane.hamropasal.product.repository.CategoryRepository;
import com.praladneupane.hamropasal.product.repository.ProductRepository;
import com.praladneupane.hamropasal.supplier.entity.Supplier;
import com.praladneupane.hamropasal.supplier.repository.SupplierRepository;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataSeeder {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final InventoryRepository inventoryRepository;
    private final CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private final PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    public void seedData() {
        if (userRepository.count() == 0) {
            seedUsers();
        }
        if (categoryRepository.count() == 0) {
            seedCategories();
        }
        if (productRepository.count() == 0) {
            seedProducts();
        }
        if (customerRepository.count() == 0) {
            seedCustomers();
        }
        if (supplierRepository.count() == 0) {
            seedSuppliers();
        }
    }

    private void seedUsers() {
        User admin = User.builder()
                .fullName("Admin User")
                .email("admin@hamropasal.com")
                .password(passwordEncoder.encode("admin123"))
                .contactNumber("9841234560")
                .role(com.praladneupane.hamropasal.user.model.Role.ADMIN)
                .build();

        User cashier = User.builder()
                .fullName("Cashier User")
                .email("cashier@hamropasal.com")
                .password(passwordEncoder.encode("cashier123"))
                .contactNumber("9847654320")
                .role(com.praladneupane.hamropasal.user.model.Role.CASHIER)
                .build();

        userRepository.saveAll(Arrays.asList(admin, cashier));
    }

    private void seedCategories() {
        Category electronics = Category.builder()
                .name("Electronics")
                .description("Electronic devices and accessories")
                .build();

        Category groceries = Category.builder()
                .name("Groceries")
                .description("Food and grocery items")
                .build();

        Category clothing = Category.builder()
                .name("Clothing")
                .description("Apparel and fashion items")
                .build();

        categoryRepository.saveAll(Arrays.asList(electronics, groceries, clothing));
    }

    private void seedProducts() {
        Category electronics = categoryRepository.findByName("Electronics").orElse(null);
        Category groceries = categoryRepository.findByName("Groceries").orElse(null);

        Product[] products = {
                Product.builder()
                        .name("Laptop")
                        .description("High-performance laptop")
                        .sku("ELEC-001")
                        .barcode("1234567890001")
                        .price(new BigDecimal("999.99"))
                        .category(electronics)
                        .build(),
                Product.builder()
                        .name("Mouse")
                        .description("Wireless mouse")
                        .sku("ELEC-002")
                        .barcode("1234567890002")
                        .price(new BigDecimal("29.99"))
                        .category(electronics)
                        .build(),
                Product.builder()
                        .name("Rice")
                        .description("Basmati rice 1kg")
                        .sku("GROC-001")
                        .barcode("1234567890003")
                        .price(new BigDecimal("5.99"))
                        .category(groceries)
                        .build(),
                Product.builder()
                        .name("Milk")
                        .description("Fresh milk 1L")
                        .sku("GROC-002")
                        .barcode("1234567890004")
                        .price(new BigDecimal("2.50"))
                        .category(groceries)
                        .build()
        };

        Arrays.stream(products).forEach(product -> {
            Product saved = productRepository.save(product);
            // Create inventory entry
            Inventory inventory = Inventory.builder()
                    .product(saved)
                    .quantityInStock(100)
                    .lowStockThreshold(10)
                    .build();
            inventoryRepository.save(inventory);
        });
    }

    private void seedCustomers() {
        Customer[] customers = {
                Customer.builder()
                        .fullName("John Doe")
                        .email("john@example.com")
                        .phone("9841234567")
                        .address("123 Main St")
                        .city("Kathmandu")
                        .totalPurchases(0.0)
                        .loyaltyPoints(0)
                        .active(true)
                        .build(),
                Customer.builder()
                        .fullName("Jane Smith")
                        .email("jane@example.com")
                        .phone("9847654321")
                        .address("456 Oak Ave")
                        .city("Lalitpur")
                        .totalPurchases(0.0)
                        .loyaltyPoints(0)
                        .active(true)
                        .build()
        };

        customerRepository.saveAll(Arrays.asList(customers));
    }

    private void seedSuppliers() {
        Supplier[] suppliers = {
                Supplier.builder()
                        .companyName("Tech Solutions Ltd")
                        .contactPerson("Rajesh Kumar")
                        .email("tech@solutions.com")
                        .phone("9851111111")
                        .address("789 Tech Park")
                        .city("Kathmandu")
                        .paymentTerms("Net 30")
                        .totalSupplied(0.0)
                        .active(true)
                        .build(),
                Supplier.builder()
                        .companyName("Fresh Foods Co")
                        .contactPerson("Priya Sharma")
                        .email("fresh@foods.com")
                        .phone("9852222222")
                        .address("321 Market Square")
                        .city("Bhaktapur")
                        .paymentTerms("COD")
                        .totalSupplied(0.0)
                        .active(true)
                        .build()
        };

        supplierRepository.saveAll(Arrays.asList(suppliers));
    }
}
