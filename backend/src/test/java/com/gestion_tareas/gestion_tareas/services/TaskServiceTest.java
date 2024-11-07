package com.gestion_tareas.gestion_tareas.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestion_tareas.gestion_tareas.entities.Task;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.File;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class TaskServiceTest {
    @TempDir
    Path tempDir;

    private File tempFile;
    private TaskService taskService;
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        tempFile = tempDir.resolve("tasks.json").toFile();
        objectMapper = new ObjectMapper();
        taskService = new TaskService(tempFile.getPath(), objectMapper);
    }

    @Test
    public void testAddTask() throws Exception {
        final Task newTask = new Task(null, "New Task", "New Description", "2024-11-08");

        taskService.addTask(newTask);

        final List<Task> tasks = taskService.getAllTasks();
        assertNotNull(newTask.getId());
        assertEquals(1, tasks.size());
        assertEquals("New Task", tasks.get(0).getTitle());
    }

    @Test
    public void testGetAllTasks() throws Exception {
        final List<Task> mockTasks = Arrays.asList(
                new Task(1L, "Task 1", "Description 1", "2024-11-06"),
                new Task(2L, "Task 2", "Description 2", "2024-11-07")
        );
        objectMapper.writeValue(tempFile, mockTasks);

        final List<Task> tasks = taskService.getAllTasks();

        assertEquals(2, tasks.size());
        assertEquals("Task 1", tasks.get(0).getTitle());
    }

    @Test
    public void testDeleteTask() throws Exception {
        final Task taskToDelete = new Task(1L, "Task to delete", "Description", "2024-11-06");
        objectMapper.writeValue(tempFile, Arrays.asList(taskToDelete));

        taskService.deleteTask(taskToDelete.getId());

        final List<Task> tasks = taskService.getAllTasks();
        assertEquals(0, tasks.size());
    }

    @Test
    public void testUpdateTask() throws Exception {
        final Task existingTask = new Task(1L, "Task 1", "Description 1", "2024-11-06");
        objectMapper.writeValue(tempFile, Arrays.asList(existingTask));

        final Task updatedTask = new Task(null, "Updated Task", "Updated Description", "2024-11-08");

        taskService.updateTask(existingTask.getId(), updatedTask);

        final List<Task> tasks = taskService.getAllTasks();
        assertEquals(1, tasks.size());
        assertEquals("Updated Task", tasks.get(0).getTitle());
        assertEquals("Updated Description", tasks.get(0).getDescription());
        assertEquals("2024-11-08", tasks.get(0).getDate());
    }
}
