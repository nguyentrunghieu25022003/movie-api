import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { ErrorMessages } from '../common/errors/error-message';

@Injectable()
export class CrawlerService {
  async findAll(page: number): Promise<any[]> {
    const url = `${process.env.KKPHIM_URL}?page=${page}`;

    const { data } = await axios.get<string>(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
    });

    if (!data) {
      throw ErrorMessages.MOVIE_NOT_FOUND;
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

  async findOne(name: string) {
    const { data } = await axios.get<object>(
      `${process.env.KKPHIM_API}/phim/${name}`,
    );

    if (!data) {
      throw ErrorMessages.MOVIE_NOT_FOUND;
    }

    return data;
  }
}
