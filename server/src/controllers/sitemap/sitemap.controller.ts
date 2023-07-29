import { Controller, Get, Header } from '@nestjs/common'
import { SitemapService } from '../../services/sitemap.service'

@Controller('sitemap')
export class SitemapController {
    constructor(private readonly sitemapService: SitemapService) {}

    @Get('sitemap.xml')
    @Header('Content-Type', 'application/xml')
    public async getSiteMap() {
        return this.sitemapService.getSitemap()
    }
}
