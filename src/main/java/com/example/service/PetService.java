package com.example.service;

import com.example.entity.PetEntity;
import com.example.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public void savePet(PetEntity pet) {
        petRepository.save(pet);
    }
}
