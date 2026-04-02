import React, { useEffect } from 'react';
import { Category } from '../models/category.model';
import { fetchCategory } from '../api/category.api';
import { useLocation } from 'react-router-dom';

export const useCategory = () => {
  const [category, setCategory] = React.useState<Category[]>([]);
  const location = useLocation();

  const setActive = () => {
    const params = new URLSearchParams(location.search);
    if (params.get('categoryId')) {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: item.categoryId === Number(params.get('categoryId')),
          };
        });
      });
    } else {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: false,
          };
        });
      });
    }
  };

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;
      const categoryWithNull = [
        { categoryId: null, categoryName: '전체' },
        ...category,
      ];
      setCategory(categoryWithNull);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return category;
};
