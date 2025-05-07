package com.example.ServerApi.services;

import com.example.ServerApi.entity.LoanDetails;
import com.example.ServerApi.entity.Manager;
import com.example.ServerApi.repositories.LoanDetailsRepository;
import com.example.ServerApi.repositories.ManagerRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LoanDetailsServicesImpl implements LoanDetailsServices {
    private ManagerRepository managerRepository;
    private LoanDetailsRepository loanDetailsRepository;

    public LoanDetailsServicesImpl(ManagerRepository managerRepository, LoanDetailsRepository loanDetailsRepository) {
        this.managerRepository = managerRepository;
        this.loanDetailsRepository = loanDetailsRepository;
    }

    @Override
    public void createLoanDetails(LoanDetails loanDetails, int managerId) {
        try {
            Manager manager = managerRepository.findById(managerId)
                    .orElseThrow(() -> new UsernameNotFoundException("Manager not found with id " + managerId));

            // Check for duplicate loan number
            List<LoanDetails> existingLoans = manager.getLoans();
            for (LoanDetails existingLoan : existingLoans) {
                if (existingLoan.getLoanNo() == loanDetails.getLoanNo()) {
                    throw new IllegalArgumentException("Loan with number " + loanDetails.getLoanNo() + " already exists for this manager.");
                }
            }

            loanDetails.setManager(manager);
            loanDetailsRepository.save(loanDetails);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    @Override
    public List<LoanDetails> getLoansByManager(int managerId) {
        try{
            Manager manager = managerRepository.findById(managerId)
                    .orElseThrow(() -> new UsernameNotFoundException("Manager not found with id " + managerId));
            return manager.getLoans();
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
