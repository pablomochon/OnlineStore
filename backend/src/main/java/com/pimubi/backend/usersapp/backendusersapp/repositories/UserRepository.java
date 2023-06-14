package com.pimubi.backend.usersapp.backendusersapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.pimubi.backend.usersapp.backendusersapp.models.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {
    
}
