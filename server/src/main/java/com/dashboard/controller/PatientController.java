package com.dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.dashboard.util.ControllerConstants;
import lombok.AllArgsConstructor;
import com.dashboard.model.Patient;
import com.dashboard.repository.PatientRepository;

@RestController
@Validated
@AllArgsConstructor
public class PatientController {

    @Autowired
    private PatientRepository repository;

    @CrossOrigin(origins = "http://localhost:3000") // For demo purposes only
    @PostMapping(ControllerConstants.CREATE_OR_UPDATE_PATIENT_DATA_URL)
    public Patient createPatient(@RequestBody Patient patient) {
        return repository.save(patient);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(ControllerConstants.GET_PATIENT_DATA_URL)
    public Page<Patient> getPatient(@RequestParam String key, @RequestParam String value) {
        return repository.findPatient(key,value, PageRequest.of(0, 100));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(ControllerConstants.GET_PATIENT_IN_RANGE_DATA_URL)
    public Page<Patient> getPatientInRange(@RequestParam String key, @RequestParam int gte, @RequestParam int lte) {
        return repository.findPatientInRange(key, gte, lte, PageRequest.of(0, 100));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(ControllerConstants.DELETE_PATIENT_DATA_URL)
    public void deletePatient(@RequestParam String id) {
        repository.deleteById(id);
    }

    // For testing
    @GetMapping(ControllerConstants.GET_ALL_PATIENT_DATA_URL)
    public Iterable<Patient> getAll() {
        return repository.findAll();
    }

    @DeleteMapping(ControllerConstants.DELETE_ALL_PATIENT_DATA_URL)
    public void deleteAll() {
        repository.deleteAll();
    }
}