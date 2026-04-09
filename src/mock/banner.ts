import { Banner } from '@/models/banner.model';
import { BookReviewItem } from '@/models/book.model';
import { http, HttpResponse } from 'msw';

const bannersData: Banner[] = [
  {
    id: 1,
    title: '여름 세일',
    description: '여름을 맞이하여 모든 책이 20% 할인!',
    image: 'http://picsum.photos/id/111/1200/300',
    link: 'http://example.com/summer-sale',
    target: '_blank',
  },
  {
    id: 2,
    title: '신간 도서 출시',
    description: '최신 베스트셀러가 출간되었습니다. 지금 확인하세요!',
    image: 'http://picsum.photos/id/112/1200/300',
    link: 'http://example.com/new-releases',
    target: '_blank',
  },
  {
    id: 3,
    title: '독서의 달 이벤트',
    description: '독서의 달을 기념하여 특별 이벤트를 진행합니다.',
    image: 'http://picsum.photos/id/113/1200/300',
    link: 'http://example.com/reading-month',
    target: '_blank',
  },
];

export const banners = http.get('http://localhost:3000/banners', (req) => {
  return HttpResponse.json(bannersData, {
    status: 200,
  });
});
