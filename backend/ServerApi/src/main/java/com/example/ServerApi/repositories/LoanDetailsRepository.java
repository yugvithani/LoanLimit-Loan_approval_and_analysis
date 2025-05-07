package com.example.ServerApi.repositories;

import com.example.ServerApi.entity.LoanDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanDetailsRepository extends JpaRepository<LoanDetails, Integer> {

}
