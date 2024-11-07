package com.gestion_tareas.gestion_tareas.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestion_tareas.gestion_tareas.entities.Task;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TaskService {
    private String FILE_PATH;
    private final ObjectMapper objectMapper;

    public TaskService() {
        this.FILE_PATH = "src/main/resources/db/tasks.json";
        this.objectMapper = new ObjectMapper();
    }

    public TaskService(String filePath, ObjectMapper objectMapper) {
        this.FILE_PATH = filePath;
        this.objectMapper = objectMapper;
    }

    public List<Task> getAllTasks() {
        try {
            final File file = new File(FILE_PATH);
            if (!file.exists() || file.length() == 0) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(file,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, Task.class));
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    public void addTask(final Task task) {
        final Long id = new Date().getTime();
        task.setId(id);
        List<Task> tasks = getAllTasks();
        tasks.add(task);
        saveTasks(tasks);
    }

    public void deleteTask(final Long id) {
        List<Task> tasks = getAllTasks();
        tasks.removeIf(task -> task.getId().equals(id));
        saveTasks(tasks);
    }

    public void updateTask(final Long id, final Task task) {
        deleteTask(id);
        task.setId(id);
        addTask(task);
    }

    private void saveTasks(final List<Task> tasks) {
        try {
            objectMapper.writeValue(new File(FILE_PATH), tasks);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}