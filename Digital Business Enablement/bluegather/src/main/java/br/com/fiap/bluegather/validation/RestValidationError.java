package br.com.fiap.bluegather.validation;

public record RestValidationError (String field, String message) {}