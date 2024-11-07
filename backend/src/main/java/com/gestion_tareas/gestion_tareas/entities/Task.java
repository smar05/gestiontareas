package com.gestion_tareas.gestion_tareas.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    private Long id;
    private String title;
    private String description;
}
