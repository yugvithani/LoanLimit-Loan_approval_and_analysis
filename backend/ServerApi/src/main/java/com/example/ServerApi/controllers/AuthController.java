package com.example.ServerApi.controllers;

import com.example.ServerApi.services.ManagerService;
import com.example.ServerApi.utils.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private ManagerService managerService;
    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, ManagerService managerService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.managerService = managerService;
    }

    @PostMapping("/admin")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> request){
        Map<String ,String > response = new HashMap<>();
        try{
            if(!("admin".equals(request.get("username")) && "123456".equals(request.get("password")))) {
                response.put("message", "Invalid username or password!");
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.get("username"), request.get("password")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication, request.get("password"));
            response.put("token", jwt);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/manager-verify/{userName}")
    public ResponseEntity<?> firstLogin(@RequestBody Map<String, String> request, @PathVariable String userName){
        Map<String ,String > response = new HashMap<>();
        try{
            managerService.verifyManager(userName,request.get("oldPassword"), request.get("newPassword"));
            response.put("message", "Password is successfully reset");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/manager")
    public ResponseEntity<?> loginManager(@RequestBody Map<String, String> request){
        Map<String ,String > response = new HashMap<>();
        try{
            managerService.loginManager(request.get("username"), request.get("password"));
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.get("username"), request.get("password")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication, request.get("password"));
            response.put("token", jwt);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
