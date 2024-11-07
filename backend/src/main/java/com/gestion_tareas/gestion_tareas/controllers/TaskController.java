package com.gestion_tareas.gestion_tareas.controllers;

import com.gestion_tareas.gestion_tareas.entities.Task;
import com.gestion_tareas.gestion_tareas.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Void> createTask(@RequestBody final Task task) {
        taskService.addTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable final Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTask(@PathVariable final Long id, @RequestBody final Task task) {
        taskService.updateTask(id, task);
        return ResponseEntity.noContent().build();
    }
}