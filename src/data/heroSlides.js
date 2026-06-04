import { categories } from './categoriesData';

const paletasImg = categories.find((cat) => cat.id === 'paletas')?.img;
const accesoriosImg = categories.find((cat) => cat.id === 'accesorios')?.img;
export const heroSlides = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkpV-sAwDj0oBQJZ8X4mNOhR83zaLbVnI-sI5e2WidNmiV8VlWXxY6gQ-SwrcNu95WqvqhwfQPM42S4ExmfLmoiocD6T9_UP2HY2LOpfEsSLftBe_MVc5t7eSWd6EhYjKIEmZY5Frc6Gm5D1iBzYHvO5ESlTcg6uut1bXSSfNLD0wHIIlnrJssQFIHyivG-rxc0kY4j9p3f8f7v-zhcPSh8iomyNIqtaHl7y4VwWHcad7LP1a24L1vuocUVshz8HOxuYh9Ndre-JIA',
    alt: 'Jugador de pádel en acción',
    position: 'center 30%',
  },
  {
    src: paletasImg,
    alt: 'Categoría Paletas',
    position: 'center center',
  },
];

export const HERO_SLIDE_INTERVAL_MS = 5500;
