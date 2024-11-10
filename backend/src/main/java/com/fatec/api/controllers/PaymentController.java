package com.fatec.api.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.fatec.api.models.Payment;
import com.fatec.api.services.PaymentService;
import org.springframework.security.access.prepost.PreAuthorize;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/pagamentos")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping
    @PreAuthorize("hasRole('SECRETARIA') or " + 
			"hasRole('COORDENADOR') or " +
			"hasRole('ADMIN')")
    public ResponseEntity<Iterable<Payment>> getAllPayments() {
        Iterable<Payment> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Payment> getPaymentById(@PathVariable String id) {
        Payment payment = paymentService.getPaymentById(id);
        return payment != null ? ResponseEntity.ok(payment) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Payment> createPayment(@Valid @RequestBody Payment payment) {
        Payment createdPayment = paymentService.createPayment(payment);
        return ResponseEntity.ok(createdPayment);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Payment> updatePayment(@PathVariable String id, @Valid @RequestBody Payment payment) {
        Payment updatedPayment = paymentService.updatePayment(id, payment);
        return ResponseEntity.ok(updatedPayment);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Void> deletePayment(@PathVariable String id) {
        paymentService.deletePayment(id);
        return ResponseEntity.ok().build();
    }    

}