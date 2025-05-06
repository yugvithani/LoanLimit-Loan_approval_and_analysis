package com.example.ServerApi.controllers;

import com.example.ServerApi.entity.Manager;
import com.example.ServerApi.services.ManagerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private ManagerService managerService;

    public AdminController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @PostMapping("/create-manager")
    public ResponseEntity<?> createManager(@RequestBody Manager manager){
        Map<String ,String > response = new HashMap<>();
        try{
            managerService.createManager(manager);
            response.put("message", "Manager created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
