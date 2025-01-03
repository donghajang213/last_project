package com.example.repository.EventRepository;

import com.example.entity.EventEntity.EventEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CassandraRepository<EventEntity, String> {
}
