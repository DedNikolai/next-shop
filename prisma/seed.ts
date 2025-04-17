import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Очистити таблиці
  await prisma.$transaction([
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Створити категорії
  await prisma.category.createMany({
    data: [
      { name: 'Піцца', url: 'pizza' },
      { name: 'Бургери', url: 'burgers' },
      { name: 'Суші', url: 'sushi' },
      { name: 'Закуски', url: 'snecks' },
    ],
  });

  // Отримати створені категорії з їхніми ID
  const categories = await prisma.category.findMany();
  const getCategoryId = (url: string) =>
    categories.find((c) => c.url === url)?.id ?? 1;

  // Створити продукти
  await prisma.product.createMany({
    data: [
      {
        name: 'Піца Маргарита',
        productUrl: 'margarita',
        description: 'Класика з томатами та сиром',
        price: 170,
        imageUrl: 'https://pizza.od.ua/upload/resize_cache/webp/iblock/62e/4y05ehhgm88eupox5eh111jo1k2e94mq.webp',
        categoryId: getCategoryId('pizza'),
      },
      {
        name: 'Піца Діабло',
        productUrl: 'diablo',
        description: 'Класика з томатами та сиром',
        price: 190,
        imageUrl: 'https://ecopizza.com.ua/548-large_default/pizza-4-meat.jpg',
        categoryId: getCategoryId('pizza'),
      },
      {
        name: 'Піца Пікантна',
        productUrl: 'pikantna',
        description: 'Класика з томатами та сиром',
        price: 150,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkVS9ToD0S4z1yCJLarp1eqfSVsbOkcHBRE6GzkGIqu1h-6Gl-HYtKCN516Vd3y_KvpY&usqp=CAU',
        categoryId: getCategoryId('pizza'),
      },
      {
        name: 'Бургер Мега',
        productUrl: 'mega-burger',
        description: 'Класика з томатами та сиром',
        price: 250,
        imageUrl: 'https://kvadratsushi.com/wp-content/uploads/2023/06/burger_amerykanskyi_new.jpg',
        categoryId: getCategoryId('burgers'),
      },
      {
        name: 'Бургер Роял',
        productUrl: 'royal-burger',
        description: 'Класика з томатами та сиром',
        price: 230,
        imageUrl: 'https://images-ru.starterapp.ru/w:1024/aHR0cHM6Ly9jZG4uc2FuaXR5LmlvL2ltYWdlcy9qOHRtenNtNS9wcm9kdWN0aW9uL2M3YWE4OTM5ODNmYTM3ZTcxM2U2ODNiYzVjMzA3ZDYyMWZkNzZjYTktNjAweDQ1MC5qcGc=',
        categoryId: getCategoryId('burgers'),
      },
      {
        name: 'Бургер Классік',
        productUrl: 'classic-burger',
        description: 'Класика з томатами та сиром',
        price: 270,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMMcvyVv31rJSv4xgfuzNClw-yCnLHpKTMJBzBW3gEkF21urjk8Kw1evK5jlt2KVx3h4&usqp=CAU',
        categoryId: getCategoryId('burgers'),
      },
      {
        name: 'Сет Японія',
        productUrl: 'set-japan',
        description: 'Класика з томатами та сиром',
        price: 700,
        imageUrl: 'https://rocosushi.com/web/uploads/products/6c18398910d7d0f7b0cf-%D0%A1%D0%B5%D1%82-1.png',
        categoryId: getCategoryId('sushi'),
      },
      {
        name: 'Сет Окфнава',
        productUrl: 'set-okinava',
        description: 'Класика з томатами та сиром',
        price: 700,
        imageUrl: 'https://online-sushi.com.ua/image/catalog/imagesforpages/dostavka-nigiri-v-kieve.jpg',
        categoryId: getCategoryId('sushi'),
      },
    ],
  });

  // Створити користувачів
  await prisma.user.createMany({
    data: [
      { email: 'user@gmail.com', fullName: 'Test User', password: '123456', role: 'USER' },
      { email: 'admin@gmail.com', fullName: 'Test Admin', password: '123456', role: 'ADMIN' },
    ],
  });
}

main()
  .then(() => console.log('✅ Seed done'))
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
