package com.example.service.BannerService;

import com.example.entity.BannerEntity.BannerEntity;
import com.example.repository.BannerRepository.BannerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BannerService {
    private final BannerRepository bannerRepository;

    public BannerService(BannerRepository bannerRepository) {
        this.bannerRepository = bannerRepository;
    }

    public List<BannerEntity> getAllBanners() {
        return bannerRepository.findAll();
    }

    public BannerEntity addBanner(BannerEntity banner) {
        banner.setId(UUID.randomUUID().toString());
        return bannerRepository.save(banner);
    }

    public void deleteBanner(String bannerId) {
        bannerRepository.deleteById(bannerId);
    }
}
