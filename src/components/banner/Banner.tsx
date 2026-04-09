import { Banner as IBanner } from '@/models/banner.model';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import BannerItem from './BannerItem';

interface Props {
  banners: IBanner[];
}

const Banner = ({ banners }: Props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const transformValue = useMemo(() => {
    return `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    if (currentIndex === banners.length - 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <BannerStyle>
      <BannerContainerStyle $transformValue={transformValue}>
        {banners.map((banner, index) => (
          <BannerItem key={index} banner={banner} />
        ))}
      </BannerContainerStyle>
      <BannerButtonStyle>
        <button className="prev" onClick={handlePrev}>
          이전
        </button>
        <button className="next" onClick={handleNext}>
          다음
        </button>
      </BannerButtonStyle>

      <BannerIndicatorStyle>
        {banners.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
};

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BannerContainerStyleProps {
  $transformValue: string;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${(props) => props.$transformValue});
  transition: transform 0.3s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    cursor: pointer;
    font-size: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    @media screen and (max-width: ${({ theme }) => theme.mediaQuery.mobile}) {
      width: 32px;
      height: 32px;
      font-size: 1.5rem;

      &.prev {
        left: 0;
      }

      &.next {
        right: 0;
      }
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: #fff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.color.primary};
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.mediaQuery.mobile}) {
    bottom: 0;

    span {
      width: 12px;
      height: 12px;

      &.active {
        width: 24px;
      }
    }
  }
`;

export default Banner;
