import { Module } from '@nestjs/common'

import { SitemapService } from '../../services/sitemap.service'
import { SitemapController } from '../../controllers/sitemap/sitemap.controller'

@Module({ controllers: [SitemapController], providers: [SitemapService] })
export class SitemapModule {}
