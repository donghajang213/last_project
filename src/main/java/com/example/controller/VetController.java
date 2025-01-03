package com.example.controller;

import com.example.entity.VetEntity;
import com.example.service.UserService;
import com.example.service.VetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vets")
public class VetController {

    @Autowired
    private UserService userService;

    @Autowired
    private VetService vetService;

    @GetMapping
    public List<VetEntity> getAllVets() {
        return vetService.getAllVets();
    }

    @PostMapping("/import")
    public void importVetsFromUsers(){
        vetService.addVetsFromUsers();
    }
}
