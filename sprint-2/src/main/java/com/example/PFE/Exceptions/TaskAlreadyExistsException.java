package com.example.PFE.Exceptions;

public class TaskAlreadyExistsException extends RuntimeException {
    public TaskAlreadyExistsException(String projectName) {
        super("tache avec le nom '" + projectName + "' existe déjà.");
    }
}
