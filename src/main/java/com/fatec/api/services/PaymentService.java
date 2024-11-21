package com.fatec.api.services;

import com.fatec.api.models.Payment;
import com.fatec.api.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public Iterable<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(String id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(String id, Payment payment) {
        Payment paymentToUpdate = paymentRepository.findById(id).orElse(null);
        if (paymentToUpdate == null) {
            return null;
        }
        /*
        private String id;
    private String reservationId;
    private String passengerName;
    private double amount;
    private LocalDate paymentDate;
    private String status;
            */
        
        paymentToUpdate.setReservationId(payment.getReservationId());
        paymentToUpdate.setPassengerName(payment.getPassengerName());
        paymentToUpdate.setAmount(payment.getAmount());
        paymentToUpdate.setPaymentDate(payment.getPaymentDate());
        paymentToUpdate.setStatus(payment.getStatus());
        return paymentRepository.save(paymentToUpdate);        
    }

    public void deletePayment(String id) {
        paymentRepository.deleteById(id);
    }


} 