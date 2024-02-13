package com.dashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.DynamicTemplates;

import lombok.Data;

@Data
@Document(indexName = "patient")
@DynamicTemplates
public class Patient {
    @Id
    private String id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String dateOfBirth;
    private int age;
    private Status status;
    private String[] streetAddress;
    private String[] city;
    private String[] zipCode;
    private String[] fieldKeys;
    private String[] fieldValues;
}