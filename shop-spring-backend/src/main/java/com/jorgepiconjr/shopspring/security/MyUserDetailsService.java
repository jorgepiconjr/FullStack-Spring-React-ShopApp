/*
package com.jorgepiconjr.shopspring.security;

import com.jorgepiconjr.shopspring.security.Users;
import com.jorgepiconjr.shopspring.security.UserPrincipal;
import com.jorgepiconjr.shopspring.security.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users users = repository.findByUsername(username);

        if (users == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new UserPrincipal(users);
    }
}
*/
