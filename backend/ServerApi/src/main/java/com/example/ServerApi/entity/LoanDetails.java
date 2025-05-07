package com.example.ServerApi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "loan_details")
public class LoanDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loanId;

    private int loanNo;
    private double salary;
    private String personHomeOwnership;
    private int creditScore;
    private int personEmpLength;
    private double loanIntRate;
    private double loanAmount;
    private int age;
    private String loanIntent;
    private int loanTerm;
    private int noOfDependants;
    private double confidenceScore;
    private String status;
    private LocalDate date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private Manager manager;

    public LoanDetails() {
    }

    public LoanDetails(int loanId, int loanNo, double salary, String personHomeOwnership, int creditScore, int personEmpLength, double loanIntRate, double loanAmount, int age, String loanIntent, int loanTerm, int noOfDependants, double confidenceScore, String status, LocalDate date, Manager manager) {
        this.loanId = loanId;
        this.loanNo = loanNo;
        this.salary = salary;
        this.personHomeOwnership = personHomeOwnership;
        this.creditScore = creditScore;
        this.personEmpLength = personEmpLength;
        this.loanIntRate = loanIntRate;
        this.loanAmount = loanAmount;
        this.age = age;
        this.loanIntent = loanIntent;
        this.loanTerm = loanTerm;
        this.noOfDependants = noOfDependants;
        this.confidenceScore = confidenceScore;
        this.status = status;
        this.date = date;
        this.manager = manager;
    }

    public int getLoanId() {
        return loanId;
    }

    public void setLoanId(int loanId) {
        this.loanId = loanId;
    }

    public int getLoanNo() {
        return loanNo;
    }

    public void setLoanNo(int loanNo) {
        this.loanNo = loanNo;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getPersonHomeOwnership() {
        return personHomeOwnership;
    }

    public void setPersonHomeOwnership(String personHomeOwnership) {
        this.personHomeOwnership = personHomeOwnership;
    }

    public int getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(int creditScore) {
        this.creditScore = creditScore;
    }

    public int getPersonEmpLength() {
        return personEmpLength;
    }

    public void setPersonEmpLength(int personEmpLength) {
        this.personEmpLength = personEmpLength;
    }

    public double getLoanIntRate() {
        return loanIntRate;
    }

    public void setLoanIntRate(double loanIntRate) {
        this.loanIntRate = loanIntRate;
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getLoanIntent() {
        return loanIntent;
    }

    public void setLoanIntent(String loanIntent) {
        this.loanIntent = loanIntent;
    }

    public int getLoanTerm() {
        return loanTerm;
    }

    public void setLoanTerm(int loanTerm) {
        this.loanTerm = loanTerm;
    }

    public int getNoOfDependants() {
        return noOfDependants;
    }

    public void setNoOfDependants(int noOfDependants) {
        this.noOfDependants = noOfDependants;
    }

    public double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Manager getManager() {
        return manager;
    }

    public void setManager(Manager manager) {
        this.manager = manager;
    }
}
