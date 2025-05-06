package com.example.ServerApi.services;
import com.example.ServerApi.entity.Manager;
import com.example.ServerApi.repositories.ManagerRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

private ManagerRepository managerRepository;

    public UserDetailsServiceImpl(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if ("admin".equals(username)) {
            return buildAdminUser(username);
        }

        try {
            Manager manager = managerRepository.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException("user not found with username  " + username));

            return User.builder()
                    .username(username)
                    .password(manager.getPassword())
                    .authorities(new SimpleGrantedAuthority(manager.getRole())) // static role management, not from database
                    .build();
        } catch (Exception e) {
            return null;
        }
    }

        private UserDetails buildAdminUser(String username) {
        // Admin users should have roles like ROLE_ADMIN, you can customize this as needed
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encodedPassword = encoder.encode("123456");
        return User.builder()
                .username(username)
                .password(encodedPassword) // Using {noop} to indicate the password is stored in plain text
                .authorities(new SimpleGrantedAuthority("ROLE_ADMIN"))
                .build();
    }

}
