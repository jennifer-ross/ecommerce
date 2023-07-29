import { Injectable } from '@nestjs/common'
import { XMLElement } from 'xmlbuilder'
import * as builder from 'xmlbuilder'

@Injectable()
export class SitemapService {
    constructor() {}
    public async getSitemap() {
        return this.buildXML([])
    }
    private async buildXML(recipes: any[]) {
        const xml = builder
            .create('urlset')
            .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        recipes.forEach((recipe) => {
            this.buildEntry(xml, `recipe/${recipe.name}`, recipe.uploadDate)
        })
        return xml.end({ pretty: true })
    }
    private buildEntry(xml: XMLElement, uri: string, date: string) {
        const baseUrl = 'http://localhost:5000'
        xml.ele('url')
            .ele('loc', `${baseUrl}/${uri}`)
            .up()
            .ele('lastmod', date)
            .up()
    }
}
