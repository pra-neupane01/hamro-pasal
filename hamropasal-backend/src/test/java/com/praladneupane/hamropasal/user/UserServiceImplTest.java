package com.praladneupane.hamropasal.user;

import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.user.dto.request.CreateUserRequest;
import com.praladneupane.hamropasal.user.dto.response.UserResponse;
import com.praladneupane.hamropasal.user.mapper.UserMapper;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import com.praladneupane.hamropasal.user.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder encoder;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void create_shouldCreateUserSuccessfully() {
        CreateUserRequest request = new CreateUserRequest(
                "John Doe",
                "john@gmail.com",
                "password123",
                "9800000000"
        );

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setContactNumber(request.contactNumber());

        UserResponse response = new UserResponse(
                1L,
                request.fullName(),
                request.email(),
                request.contactNumber()
        );

        when(userRepository.existsByEmail(request.email())).thenReturn(false);
        when(encoder.encode(request.password())).thenReturn("encodedPassword");
        when(userMapper.toEntity(request)).thenReturn(user);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(userMapper.toResponse(user)).thenReturn(response);

        UserResponse result = userService.create(request);

        assertEquals(response, result);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        assertEquals("encodedPassword", userCaptor.getValue().getPassword());
        verify(userRepository).existsByEmail(request.email());
        verify(encoder).encode(request.password());
        verify(userMapper).toEntity(request);
        verify(userMapper).toResponse(user);
    }

    @Test
    void create_shouldThrowBusinessException_WhenEmailAlreadyExists() {
        CreateUserRequest request = new CreateUserRequest(
                "John Doe",
                "john@gmail.com",
                "password123",
                "9800000000"
        );

        when(userRepository.existsByEmail(request.email())).thenReturn(true);

        assertThrows(BusinessException.class, () -> userService.create(request));

        verify(userRepository).existsByEmail(request.email());
        verify(encoder, never()).encode(anyString());
        verify(userMapper, never()).toEntity(any());
        verify(userRepository, never()).save(any());
        verify(userMapper, never()).toResponse(any());
    }

    @Test
    void update_shouldUpdateUserSuccessfully() {
        Long id = 1L;
        CreateUserRequest request = new CreateUserRequest(
                "John Doe Updated",
                null,
                null,
                "9800000001"
        );

        User user = new User();
        user.setId(id);
        user.setFullName("John Doe");
        user.setEmail("john@gmail.com");
        user.setContactNumber("9800000000");

        UserResponse response = new UserResponse(
                id,
                request.fullName(),
                user.getEmail(),
                request.contactNumber()
        );

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userMapper.toResponse(user)).thenReturn(response);

        UserResponse result = userService.update(id, request);

        assertEquals(response, result);
        assertEquals(request.fullName(), user.getFullName());
        assertEquals(request.contactNumber(), user.getContactNumber());
        verify(userRepository).findById(id);
        verify(userMapper).toResponse(user);
    }

    @Test
    void getUserById_shouldReturnUserSuccessfully() {
        Long id = 1L;
        User user = new User();
        user.setId(id);
        user.setFullName("John Doe");
        user.setEmail("john@gmail.com");
        user.setContactNumber("9800000000");

        UserResponse response = new UserResponse(
                id,
                user.getFullName(),
                user.getEmail(),
                user.getContactNumber()
        );

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userMapper.toResponse(user)).thenReturn(response);

        UserResponse result = userService.getUserById(id);

        assertEquals(response, result);
        verify(userRepository).findById(id);
        verify(userMapper).toResponse(user);
    }

    @Test
    void getUserById_shouldThrowWhenUserMissing() {
        Long id = 1L;
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(id));

        verify(userRepository).findById(id);
        verify(userMapper, never()).toResponse(any());
    }

    @Test
    void getAllUsers_shouldReturnPagedResponse() {
        PageRequest pageRequest = PageRequest.of(0, 2);
        User firstUser = new User();
        firstUser.setId(1L);
        firstUser.setFullName("John Doe");
        firstUser.setEmail("john@gmail.com");
        firstUser.setContactNumber("9800000000");

        User secondUser = new User();
        secondUser.setId(2L);
        secondUser.setFullName("Jane Doe");
        secondUser.setEmail("jane@gmail.com");
        secondUser.setContactNumber("9800000001");

        Page<User> userPage = new PageImpl<>(List.of(firstUser, secondUser), pageRequest, 2);
        UserResponse firstResponse = new UserResponse(
                1L,
                firstUser.getFullName(),
                firstUser.getEmail(),
                firstUser.getContactNumber()
        );
        UserResponse secondResponse = new UserResponse(
                2L,
                secondUser.getFullName(),
                secondUser.getEmail(),
                secondUser.getContactNumber()
        );

        when(userRepository.findAll(pageRequest)).thenReturn(userPage);
        when(userMapper.toResponse(firstUser)).thenReturn(firstResponse);
        when(userMapper.toResponse(secondUser)).thenReturn(secondResponse);

        PagedResponse<UserResponse> result = userService.getAllUsers(pageRequest);

        assertEquals(2L, result.totalElements());
        assertEquals(2, result.size());
        assertEquals(1, result.page());
        assertTrue(result.first());
        assertTrue(result.last());
        assertEquals(List.of(firstResponse, secondResponse), result.content());
        verify(userRepository).findAll(pageRequest);
        verify(userMapper).toResponse(firstUser);
        verify(userMapper).toResponse(secondUser);
    }
}
