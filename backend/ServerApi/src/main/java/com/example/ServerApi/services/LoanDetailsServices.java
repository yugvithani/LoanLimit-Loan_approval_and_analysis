package com.example.ServerApi.services;

import com.example.ServerApi.entity.LoanDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LoanDetailsServices {

    public void createLoanDetails(LoanDetails loanDetails,int managerId);
    public List<LoanDetails> getLoansByManager(int managerId);
}
