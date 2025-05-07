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
import java.util.List;
import java.util.Objects;
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
        manager.setPassword(generateRandomString(6));
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
            if(!Objects.equals(oldPassword, newmanager.getPassword()))
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

    @Override
    public Manager getManager(String userName){
        try{
            return managerRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Manager not found"));
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Manager> getAllManager(){
        try {
            return managerRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteManager(String userName){
        try {
            Manager manager = managerRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Manager not found with username  " + userName));
            managerRepository.delete(manager);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void changeManager(Manager manager){
        try{
            Manager newmanager = managerRepository.findById(manager.getManagerId()).orElseThrow(() -> new UsernameNotFoundException("Manager not found with id  " + manager.getManagerId()));
            newmanager.setManagerMail(manager.getManagerMail());
            newmanager.setPassword(generateRandomString(6));
            newmanager.setManagerName(manager.getManagerName());
            newmanager.setVerify(false);
            managerRepository.save(newmanager);
            sendManagerEmail(newmanager);
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
        String fromAddress = "loanlimit9@gmail.com";
        String senderName = "LoanLimit";
        String subject = "Your Manager Account Credentials";
        String username = manager.getUserName();

        // HTML content with styling
        String content = ""
                + "<!DOCTYPE html>"
                + "<html lang='en'>"
                + "<head>"
                + "    <meta charset='UTF-8'>"
                + "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "    <title>Manager Account Created</title>"
                + "    <style>"
                + "        body {"
                + "            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                + "            line-height: 1.6;"
                + "            color: #333333;"
                + "            max-width: 600px;"
                + "            margin: 0 auto;"
                + "            padding: 20px;"
                + "        }"
                + "        .email-container {"
                + "            border: 1px solid #e1e1e1;"
                + "            border-radius: 5px;"
                + "            overflow: hidden;"
                + "            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);"
                + "        }"
                + "        .header {"
                + "            background-color: #4A90E2;"
                + "            color: white;"
                + "            padding: 20px;"
                + "            text-align: center;"
                + "        }"
                + "        .content {"
                + "            padding: 20px 30px;"
                + "            background-color: #ffffff;"
                + "        }"
                + "        .credentials-box {"
                + "            background-color: #f9f9f9;"
                + "            border-left: 4px solid #4A90E2;"
                + "            padding: 15px;"
                + "            margin: 20px 0;"
                + "        }"
                + "        .credential-item {"
                + "            margin-bottom: 10px;"
                + "        }"
                + "        .label {"
                + "            font-weight: bold;"
                + "            color: #555555;"
                + "        }"
                + "        .value {"
                + "            font-family: monospace;"
                + "            background-color: #f1f1f1;"
                + "            padding: 3px 6px;"
                + "            border-radius: 3px;"
                + "        }"
                + "        .button-container {"
                + "            text-align: center;"
                + "            margin: 25px 0 15px;"
                + "        }"
                + "        .verify-button {"
                + "            display: inline-block;"
                + "            background-color: #4CAF50;"
                + "            color: white;"
                + "            padding: 12px 25px;"
                + "            text-decoration: none;"
                + "            border-radius: 4px;"
                + "            font-weight: bold;"
                + "            text-transform: uppercase;"
                + "            letter-spacing: 0.5px;"
                + "            font-size: 14px;"
                + "            transition: background-color 0.3s;"
                + "        }"
                + "        .verify-button:hover {"
                + "            background-color: #45a049;"
                + "        }"
                + "        .footer {"
                + "            text-align: center;"
                + "            padding: 15px;"
                + "            font-size: 12px;"
                + "            color: #777777;"
                + "            background-color: #f7f7f7;"
                + "            border-top: 1px solid #e1e1e1;"
                + "        }"
                + "        .warning {"
                + "            color: #e74c3c;"
                + "            font-style: italic;"
                + "            font-size: 13px;"
                + "            margin-top: 5px;"
                + "        }"
                + "        .logo {"
                + "            font-size: 24px;"
                + "            font-weight: bold;"
                + "            letter-spacing: 1px;"
                + "        }"
                + "    </style>"
                + "</head>"
                + "<body>"
                + "    <div class='email-container'>"
                + "        <div class='header'>"
                + "            <div class='logo'>LOAN LIMIT</div>"
                + "            <p>Manager Account Credentials</p>"
                + "        </div>"
                + "        <div class='content'>"
                + "            <p>Dear <strong>" + manager.getManagerName() + "</strong>,</p>"
                + "            <p>Your account has been successfully created as a Manager in our system.</p>"
                + "            <div class='credentials-box'>"
                + "                <div class='credential-item'>"
                + "                    <span class='label'>Username:</span> "
                + "                    <span class='value'>" + username + "</span>"
                + "                </div>"
                + "                <div class='credential-item'>"
                + "                    <span class='label'>Temporary Password:</span> "
                + "                    <span class='value'>" + manager.getPassword() + "</span>"
                + "                </div>"
                + "                <p class='warning'>Please change your password immediately during your first login.</p>"
                + "            </div>"
                + "            <div class='button-container'>"
                + "                <a href='http://localhost:5173/verify/" + username + "' class='verify-button'>Verify Account</a>"
                + "            </div>"
                + "            <p>If you have any questions or need assistance, please contact our support team.</p>"
                + "            <p>Thank you,<br>The LoanLimit Team</p>"
                + "        </div>"
                + "        <div class='footer'>"
                + "            <p>© 2025 LoanLimit. All rights reserved.</p>"
                + "            <p>This is an automated message. Please do not reply to this email.</p>"
                + "        </div>"
                + "    </div>"
                + "</body>"
                + "</html>";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content, true); // Set to true to enable HTML content

        javaMailSender.send(message);
    }
}

