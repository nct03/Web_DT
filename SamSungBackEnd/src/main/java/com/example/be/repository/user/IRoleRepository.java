package com.example.be.repository.user;

import com.example.be.model.Role;
import com.example.be.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRoleRepository extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(RoleName name);
}
