package com.example.ServerApi.controllers;


import com.example.ServerApi.entity.LoanDetails;
import com.example.ServerApi.services.LoanDetailsServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/loan")
public class LoanDetailsController {
    private LoanDetailsServices loanDetailsServices;

    public LoanDetailsController(LoanDetailsServices loanDetailsServices) {
        this.loanDetailsServices = loanDetailsServices;
    }

    @PostMapping("/create/{managerId}")
    public ResponseEntity<?> createLoan(@RequestBody LoanDetails loanDetails, @PathVariable int managerId) {
        Map<String, String> response = new HashMap<>();
        try {
            loanDetailsServices.createLoanDetails(loanDetails, managerId);
            response.put("message", "created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/manager/{managerId}")
    public ResponseEntity<Map<String, Object>> getLoansByManager(@PathVariable int managerId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<LoanDetails> loans = loanDetailsServices.getLoansByManager(managerId);
            response.put("loans", loans);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


}
