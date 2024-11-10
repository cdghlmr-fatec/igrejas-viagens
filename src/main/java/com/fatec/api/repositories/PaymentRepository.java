package com.fatec.api.repositories;

import com.fatec.api.models.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, String> {
        Payment findByPaymentId(String paymentId);
        Payment findByReservationId(String reservationId);
        Boolean existsByPaymentId(String paymentId);
        Boolean existsByReservationId(String reservationId);
} 