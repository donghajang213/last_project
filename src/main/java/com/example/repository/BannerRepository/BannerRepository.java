package com.example.repository.BannerRepository;

import com.example.entity.BannerEntity.BannerEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends CassandraRepository<BannerEntity, String> {
}
