package com.example.ServerApi.services;

import com.example.ServerApi.entity.Manager;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.List;

public interface ManagerService {
    public void createManager(Manager manager);
    public void verifyManager(String userName, String oldPassword, String newPassword);
    public void loginManager(String userName, String password);
    public Manager getManager(String userName);
    public List<Manager> getAllManager();
    public void deleteManager(String userName);
    public void changeManager(Manager manager);
}