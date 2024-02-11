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
}

