package com.dashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import lombok.Data;

@Data
@Document(indexName = "patient")
public class Patient {
    @Id
    private String id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String dateOfBirth;
    private Status status;
    private String[] addresses;
    // TODO: arbitrary fields
}