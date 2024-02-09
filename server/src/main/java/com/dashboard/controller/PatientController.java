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
import org.springframework.web.bind.annotation.CrossOrigin;
import com.dashboard.util.ControllerConstants;
import com.dashboard.model.Patient;

@RestController
@Validated
@RequestMapping()
public class PatientController {

    public PatientController() {}

    @CrossOrigin(origins = "http://localhost:3000") // TODO: remove after testing
    @PostMapping(ControllerConstants.CREATE_PATIENT_DATA_URL)
    public @ResponseBody ResponseEntity<Patient> createPatientData(@RequestBody Patient patient) {
        return new ResponseEntity<Patient>(patient, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(ControllerConstants.GET_PATIENT_DATA_URL)
    public @ResponseBody ResponseEntity<String> getPatientData(@RequestParam String fieldKey, @RequestParam String fieldValue) {
        return new ResponseEntity<String>(fieldKey + fieldValue, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(ControllerConstants.UPDATE_PATIENT_DATA_URL)
    public @ResponseBody ResponseEntity<Patient> updatePatientData(@RequestBody Patient patient) {
        return new ResponseEntity<Patient>(patient, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(ControllerConstants.DELETE_PATIENT_DATA_URL)
    public @ResponseBody ResponseEntity<Patient> deletePatientData(@RequestBody Patient patient) {
        return new ResponseEntity<Patient>(patient, HttpStatus.OK);
    }
}