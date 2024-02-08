package com.dashboard.model;

import lombok.Builder;

@Builder
public record Patient(Field[] fields){}