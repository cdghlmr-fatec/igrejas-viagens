package com.fatec.api.security.services;

import com.fatec.api.models.User; // Import User model
import com.fatec.api.repository.UserRepository; // Import UserRepository for user database operations
import org.springframework.beans.factory.annotation.Autowired; // Import for dependency injection
import org.springframework.security.core.userdetails.UserDetails; // Import UserDetails interface
import org.springframework.security.core.userdetails.UserDetailsService; // Import UserDetailsService interface
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Import for handling user not found
import org.springframework.stereotype.Service; // Import for service annotation
import org.springframework.transaction.annotation.Transactional; // Import for transaction management

@Service 
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired 
	UserRepository userRepository;

	@Override
	@Transactional 
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		
		return UserDetailsImpl.build(user);
	}
}
