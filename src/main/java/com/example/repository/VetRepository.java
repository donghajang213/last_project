package com.example.repository;

import com.example.entity.VetEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.UUID;

public interface VetRepository extends CassandraRepository<VetEntity, String> {
}
