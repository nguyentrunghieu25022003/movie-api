import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { ErrorMessages } from '../common/errors/error-message';

@Injectable()
export class CrawlerService {
  async kkPhimFindAll(page: number): Promise<any[]> {
    const url = `${process.env.KKPHIM_URL}?page=${page}`;

    const { data } = await axios.get<string>(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
    });

    if (!data) {
      throw ErrorMessages.NOT_FOUND;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const $ = cheerio.load(data) as any;

    const results = [] as any[];

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, 
                  @typescript-eslint/no-unsafe-call, 
                  @typescript-eslint/no-unsafe-member-access */
    $('tbody tr').each((_, el) => {
      const name = $(el).find('h3').text().trim();
      const origin_name = $(el).find('h4').text().trim();
      const img = $(el).find('img').attr('src') ?? '';

      results.push({ name, origin_name, img });
    });

    return results;
  }

  async kkPhimFindOne(name: string) {
    const url = `${process.env.KKPHIM_API}/phim/${name}`;
    const { data } = await axios.get<object>(url);

    if (!data) {
      throw ErrorMessages.NOT_FOUND;
    }

    return data;
  }

  async motChillFindAll(category: string, page: number): Promise<any[]> {
    const url = `${process.env.MOTCHILL_API}/the-loai/${category}?page=${page}`;

    const { data } = await axios.get<string>(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
    });

    if (!data) {
      throw ErrorMessages.NOT_FOUND;
    }

    const $ = cheerio.load(data) as any;

    const results: object[] = [];

    $('div.myui-vodlist__box').each((_, el) => {
      const name = $(el).find('h4').text().trim();
      const origin_name = $(el).find('p').text().trim();
      const style = $(el).find('.myui-vodlist__thumb').attr('style') || '';
      const backgroundMatch = style.match(/url\((.*?)\)/);
      const backgroundUrl = backgroundMatch ? backgroundMatch[1] : '';
      const img = `${process.env.MOTCHILL_API}${backgroundUrl}`;

      results.push({ name, origin_name, img });
    });

    return results;
  }

  async motChillFindOne(name: string) {
    const url = `${process.env.MOTCHILL_API}/phim/${name}/tap-1`;

    const { data } = await axios.get<string>(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
    });

    if (!data) {
      throw ErrorMessages.NOT_FOUND;
    }

    const $ = cheerio.load(data) as any;

    const episodes: object[] = [];

    $('.myui-content__list.sort-list.clearfix li a').each((_, el) => {
      const number = $(el).text().trim();
      const href = $(el).attr('href');

      episodes.push({ number, href });
    });

    return episodes;
  }
}
