package com.example.be.service.role.impl;

import com.example.be.model.Role;
import com.example.be.model.RoleName;
import com.example.be.repository.user.IRoleRepository;
import com.example.be.service.role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    IRoleRepository roleRepository;
    @Override
    public Optional<Role> findByName(RoleName name) {
        return roleRepository.findByName(name);
    }
}