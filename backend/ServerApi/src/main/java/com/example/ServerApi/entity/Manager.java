package com.example.ServerApi.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "managers")
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int managerId;
    private String branchName;
    private String city;
    private String managerName;
    private String managerMail;
    @Column(unique = true)
    private String userName;
    private String password;
    private boolean verify;
    private String role = "ROLE_MANAGER";

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    private List<LoanDetails> loans;


    public Manager(int managerId, String branchName, String city, String managerName, String managerMail, String userName, String password, boolean verify, List<LoanDetails> loans) {
        this.managerId = managerId;
        this.branchName = branchName;
        this.city = city;
        this.managerName = managerName;
        this.managerMail = managerMail;
        this.userName = userName;
        this.password = password;
        this.verify = verify;
        this.loans = loans;
    }

    public Manager() {}

    public int getManagerId() {
        return managerId;
    }

    public void setManagerId(int managerId) {
        this.managerId = managerId;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerMail() {
        return managerMail;
    }

    public void setManagerMail(String managerMail) {
        this.managerMail = managerMail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isVerify() {
        return verify;
    }

    public void setVerify(boolean verify) {
        this.verify = verify;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    public String getPassword() {
        return password;
    }

    public List<LoanDetails> getLoans() {
        return loans;
    }

    public void setLoans(List<LoanDetails> loans) {
        this.loans = loans;
    }
}

