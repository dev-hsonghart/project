export type ThemeName = 'light' | 'dark';
export type HeadingSize = 'large' | 'medium' | 'small';
export type ColorKey =
  | 'primary'
  | 'background'
  | 'secondary'
  | 'third'
  | 'border'
  | 'text';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonScheme = 'primary' | 'normal';
export type LayoutWidth = 'large' | 'medium' | 'small';

interface Theme {
  name: ThemeName;
  color: {
    [key in ColorKey]: string;
  };
  heading: {
    [key in HeadingSize]: {
      fontSize: string;
    };
  };
  button: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      backgroundColor: string;
      color: string;
    };
  };
  borderRadius: {
    default: string;
  };
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}

export const light: Theme = {
  name: 'light',
  color: {
    primary: 'brown',
    background: 'lightgray',
    secondary: 'blue',
    third: 'green',
    border: 'gray',
    text: 'black',
  },
  heading: {
    large: { fontSize: '2rem' },
    medium: { fontSize: '1.5rem' },
    small: { fontSize: '1rem' },
  },
  button: {
    large: { fontSize: '1.25rem', padding: '1rem 2rem' },
    medium: { fontSize: '1rem', padding: '0.75rem 1.5rem' },
    small: { fontSize: '0.875rem', padding: '0.5rem 1rem' },
  },
  buttonScheme: {
    primary: { backgroundColor: 'coral', color: 'white' },
    normal: { backgroundColor: 'lightgray', color: 'black' },
  },
  borderRadius: {
    default: '4px',
  },
  layout: {
    width: {
      large: '1200px',
      medium: '992px',
      small: '768px',
    },
  },
};

export const dark: Theme = {
  ...light,
  name: 'dark',
  color: {
    primary: 'coral',
    background: 'midnightblue',
    secondary: 'darkblue',
    third: 'darkgreen',
    border: 'lightgray',
    text: 'white',
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
  }
};
