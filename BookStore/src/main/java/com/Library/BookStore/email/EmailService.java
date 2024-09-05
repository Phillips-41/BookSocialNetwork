package com.Library.BookStore.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine springTemplateEngine;

    @Async
    public void sendEmail(String to,
                          String username,
                          EmailTemplateName emailTemplateName,
                          String ConfirmationEmail,
                          String activationCode,
                          String subject) throws MessagingException {
        String TemplateName;
        if(emailTemplateName == null){
            TemplateName ="Confirmation_Email";
        }else{
            TemplateName = emailTemplateName.getName();
        }
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper =new MimeMessageHelper(mimeMessage,
                MULTIPART_MODE_MIXED,
                UTF_8.name());
        Map<String,Object> properties = new HashMap<>();
        properties.put("username",username);
        properties.put("confirmationUrl",ConfirmationEmail);
        properties.put("activationCode",activationCode);
        Context context = new Context();
        context.setVariables(properties);
        helper.setTo(to);
        helper.setFrom("sunnyphillips1234@gmail.com");
        helper.setSubject(subject);
        String template = springTemplateEngine.process(TemplateName,context);
        helper.setText(template,true);
        mailSender.send(mimeMessage);
    }

}
