package com.example.ServerApi.controllers;

import com.example.ServerApi.entity.Manager;
import com.example.ServerApi.services.ManagerService;
import com.example.ServerApi.utils.JwtUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/manager")
public class ManagerController {
    private final JwtUtils jwtUtils;
    private ManagerService managerService;

    public ManagerController(JwtUtils jwtUtils, ManagerService managerService) {
        this.jwtUtils = jwtUtils;
        this.managerService = managerService;
    }

    @GetMapping("/get-manager")
    public ResponseEntity<?> getManager(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader){
        try{
            Map<String ,Manager > response = new HashMap<>();
            String token = authorizationHeader.substring(7); // Remove "Bearer " part
            String userName = jwtUtils.getUsernameFromToken(token);
            Manager manager = managerService.getManager(userName);
            response.put("manager", manager);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        }catch(Exception e){
            Map<String ,String > response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
