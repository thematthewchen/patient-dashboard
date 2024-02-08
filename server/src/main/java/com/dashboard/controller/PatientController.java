package com.dashboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.dashboard.util.ControllerConstants;
import com.dashboard.model.Patient;

@RestController
@Validated
public class PatientController {

    public PatientController() {}


    @PostMapping(ControllerConstants.CREATE_PATIENT_DATA_URL)
    public @ResponseBody ResponseEntity<Patient> createPatientData(@RequestBody Patient patient) {
        return new ResponseEntity<Patient>(patient, HttpStatus.OK);
    }

    @GetMapping(ControllerConstants.GET_PATIENT_DATA_URL)
    public @ResponseBody ResponseEntity<Patient> getPatientData(@RequestBody Patient patient) {
        return new ResponseEntity<Patient>(patient, HttpStatus.OK);
    }

    @PostMapping(ControllerConstants.UPDATE_PATIENT_DATA_URL)
    public @ResponseBody ResponseEntity<Patient> updatePatientData(@RequestBody Patient patient) {
        return new ResponseEntity<Patient>(patient, HttpStatus.OK);
    }

    @PostMapping(ControllerConstants.DELETE_PATIENT_DATA_URL)
    public @ResponseBody ResponseEntity<Patient> deletePatientData(@RequestBody Patient patient) {
        return new ResponseEntity<Patient>(patient, HttpStatus.OK);
    }
}