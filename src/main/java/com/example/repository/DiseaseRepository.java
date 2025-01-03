package com.example.repository;

import com.example.entity.DiseaseEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DiseaseRepository extends CassandraRepository<DiseaseEntity, UUID> {
}
