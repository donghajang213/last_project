package com.example.controller.BannerController;

import com.example.entity.BannerEntity.BannerEntity;
import com.example.service.BannerService.BannerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/banners")
public class BannerController {
    private final BannerService bannerService;

    public BannerController(BannerService bannerService) {
        this.bannerService = bannerService;
    }

    @GetMapping
    public List<BannerEntity> getAllBanners() {
        return bannerService.getAllBanners();
    }

    @PostMapping
    public BannerEntity addBanner(@RequestBody BannerEntity banner) {
        return bannerService.addBanner(banner);
    }

    @DeleteMapping("/{bannerId}")
    public void deleteBanner(@PathVariable String bannerId) {
        bannerService.deleteBanner(bannerId);
    }
}
