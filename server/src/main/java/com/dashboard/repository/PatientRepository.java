package com.dashboard.repository;

import com.dashboard.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
public interface PatientRepository extends ElasticsearchRepository<Patient, String> {

    // Returns documents with "key" fuzzy matching "value"
    @Query("{\"match\" : {\"?0\" : {\"query\" : \"?1\",\"fuzziness\": \"auto\"}}}")
    Page<Patient> findPatient(String key, String value, Pageable pageable);

    // Returns documents with "key" in a range between gte and lte
    @Query("{\"range\": {\"?0\": {\"gte\": ?1,\"lte\": ?2}}}")
    Page<Patient> findPatientInRange(String key, int gte, int lte, Pageable pageable);
}