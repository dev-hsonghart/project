import React, { useEffect } from 'react';
import { Category } from '../models/category.model';
import { fetchCategory } from '../api/category.api';

export const useCategory = () => {
  const [category, setCategory] = React.useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;
      const categoryWithNull = [
        { categoryId: null, categoryName: '전체' },
        ...category,
      ];
      setCategory(categoryWithNull);
    });
  }, []);

  console.log(category);

  return category;
};
