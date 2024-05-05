package com.example.PFE.Exceptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(String name) {
        super("tache avec le nom '" + name + "' non trouvé.");
    }
    public TaskNotFoundException(Long id) {
        super("tache avec le nom '" + id + "' non trouvé.");
    }
}
