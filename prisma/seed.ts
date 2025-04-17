import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Піцца', url: 'pizza' },
      { name: 'Бургери', url: 'burgers' },
      { name: 'Суші', url: 'sushi' },
      { name: 'Закуски', url: 'snecks' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Піца Маргарита', description: 'Класика з томатами та сиром', categoryId: 1, price: 170, imageUrl: 'https://pizza.od.ua/upload/resize_cache/webp/iblock/62e/4y05ehhgm88eupox5eh111jo1k2e94mq.webp' },
      { name: 'Піца Діабло', description: 'Класика з томатами та сиром', categoryId: 1, price: 190, imageUrl: 'https://ecopizza.com.ua/548-large_default/pizza-4-meat.jpg' },
      { name: 'Піца Пікантна', description: 'Класика з томатами та сиром', categoryId: 1, price: 150, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkVS9ToD0S4z1yCJLarp1eqfSVsbOkcHBRE6GzkGIqu1h-6Gl-HYtKCN516Vd3y_KvpY&usqp=CAU' },
      { name: 'Бургер Мега', description: 'Класика з томатами та сиром', categoryId: 2, price: 250, imageUrl: 'https://kvadratsushi.com/wp-content/uploads/2023/06/burger_amerykanskyi_new.jpg' },
      { name: 'Бургер Роял', description: 'Класика з томатами та сиром', categoryId: 2, price: 230, imageUrl: 'https://images-ru.starterapp.ru/w:1024/aHR0cHM6Ly9jZG4uc2FuaXR5LmlvL2ltYWdlcy9qOHRtenNtNS9wcm9kdWN0aW9uL2M3YWE4OTM5ODNmYTM3ZTcxM2U2ODNiYzVjMzA3ZDYyMWZkNzZjYTktNjAweDQ1MC5qcGc=' },
      { name: 'Бургер Классік', description: 'Класика з томатами та сиром', categoryId: 2, price: 270, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMMcvyVv31rJSv4xgfuzNClw-yCnLHpKTMJBzBW3gEkF21urjk8Kw1evK5jlt2KVx3h4&usqp=CAU' },
      { name: 'Сет Японія', description: 'Класика з томатами та сиром', categoryId: 3, price: 700, imageUrl: 'https://rocosushi.com/web/uploads/products/6c18398910d7d0f7b0cf-%D0%A1%D0%B5%D1%82-1.png' },
      { name: 'Сет Окфнава', description: 'Класика з томатами та сиром', categoryId: 3, price: 700, imageUrl: 'https://online-sushi.com.ua/image/catalog/imagesforpages/dostavka-nigiri-v-kieve.jpg' },
    ],
  });

  await prisma.user.createMany({
    data: [
      { email: 'user@gmail.com', fullName: 'Test User', password: '123456', role: 'USER' },
      { email: 'admin@gmail.com', fullName: 'Test Admin', password: '123456', role: 'ADMIN' },
    ],
  });
}

main()
  .then(() => console.log('✅ Seed done'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
