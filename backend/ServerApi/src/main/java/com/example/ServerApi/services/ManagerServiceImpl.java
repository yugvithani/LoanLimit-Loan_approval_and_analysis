package com.example.ServerApi.services;

import com.example.ServerApi.entity.Manager;
import com.example.ServerApi.repositories.ManagerRepository;
import com.example.ServerApi.services.ManagerService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.util.Optional;

@Service
public class ManagerServiceImpl implements ManagerService {

    private ManagerRepository managerRepository;
    private JavaMailSender javaMailSender;
    private PasswordEncoder passwordEncoder;


    public ManagerServiceImpl(ManagerRepository managerRepository, JavaMailSender javaMailSender, PasswordEncoder passwordEncoder) {
        this.managerRepository = managerRepository;
        this.javaMailSender = javaMailSender;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void createManager(Manager manager) {
        manager.setPassword(passwordEncoder.encode(generateRandomString(6)));
        manager.setUserName(manager.getBranchName().toLowerCase()+"-"+manager.getCity().toLowerCase()+"@manager");
        manager.setVerify(false);

        Optional<Manager> existManager = managerRepository.findByUserName(manager.getUserName());

        if(existManager.isPresent()){
            throw new RuntimeException("Manager is already exists with this branch!");
        }
        managerRepository.save(manager);

        try {
            sendManagerEmail(manager);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void verifyManager(String userName, String oldPassword, String newPassword) {
        try{
            Manager newmanager = managerRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Manager not found with username  " + userName));
            if(!passwordEncoder.matches(oldPassword, newmanager.getPassword()))
                throw new Exception("password not match!");
            if(newmanager.isVerify())
                throw new Exception("already password has been reset");
            newmanager.setPassword(passwordEncoder.encode(newPassword));
            newmanager.setVerify(true);
            managerRepository.save(newmanager);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void loginManager(String userName, String password){
        try{
            Manager manager = managerRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Manager not found with username  " + userName));
            if(!manager.isVerify())
                throw new Exception("Please first make your password using temporary password.");
            if(!passwordEncoder.matches(password, manager.getPassword()))
                throw new Exception("Password is incorrect.");

        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    //    mathod for generating random string of n length
    public static String generateRandomString(int length) {
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }

    // mathod for sending mail to manager to inform username and password
    public void sendManagerEmail(Manager manager)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = manager.getManagerMail();
        String fromAddress = "loanlimit9@gmail.com"; //
        String senderName = "LoanLimit";
        String subject = "Your Manager Account Credentials";

        // Generate temporary password (Can be replaced with more secure logic)

        String content = "Dear [[name]],<br><br>"
                + "Your account has been created as a Manager.<br>"
                + "Here are your credentials:<br><br>"
                + "<b>Username:</b> [[username]]<br>"
                + "<b>Temporary Password:</b> [[password]]<br>"
                + "<br>"
                + "Please change your password upon first login.<br><br>"
                + "Thank you,<br>"
                + "LoanLimit.";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", manager.getManagerName());
        content = content.replace("[[username]]", manager.getUserName());
        content = content.replace("[[password]]", manager.getPassword()); // Attach temporary password

        helper.setText(content, true);

        javaMailSender.send(message);
    }
}

