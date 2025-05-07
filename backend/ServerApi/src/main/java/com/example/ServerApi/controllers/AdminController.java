package com.example.ServerApi.controllers;

import com.example.ServerApi.entity.Manager;
import com.example.ServerApi.services.ManagerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private ManagerService managerService;

    public AdminController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @GetMapping("/all-manager")
    public ResponseEntity<?> getAllManager(){
        Map<String ,String > response = new HashMap<>();
        try {
            List<Manager> managers = managerService.getAllManager();
            return ResponseEntity.ok(managers);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
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

    @DeleteMapping("/delete-manager/{username}")
    public ResponseEntity<?> deleteManager(@PathVariable String username){
        Map<String ,String > response = new HashMap<>();
        try {
            managerService.deleteManager(username);
            response.put("message", "Manager is delete successfully");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/change-manager")
    public ResponseEntity<?> changeManager(@RequestBody Manager manager){
        Map<String ,String > response = new HashMap<>();
        try{
            managerService.changeManager(manager);
            response.put("message", "Changed successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
