import random
from django.core.management.base import BaseCommand
from faker import Faker
from api.models import CustomUser, Token, Product, Order, Review
from uuid import uuid4
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seeds the database with initial data'
    faker = Faker()

    def add_arguments(self, parser):
        parser.add_argument('records', type=int, help='The number of records to seed')

    def handle(self, *args, **kwargs):
        records = kwargs['records']
        self.stdout.write(f'Seeding {records} records...')
        
        self.reset_db()
        
        self.create_users(records)
        self.create_products(records)
        self.create_orders(records)
        self.create_reviews(records)
        
        self.stdout.write('Data seeded successfully.')

    def reset_db(self):
        self.stdout.write('Resetting the database...')
        CustomUser.objects.all().delete()
        Token.objects.all().delete()
        Product.objects.all().delete()
        Order.objects.all().delete()
        Review.objects.all().delete()
        self.stdout.write('Database reset completed.')

    def create_users(self, records):
        for _ in range(records):
            email = self.faker.email()
            user = CustomUser.objects.create_user(
                id=uuid4(),
                username=self.faker.user_name(),
                email=email,
                password=self.faker.password(),
                is_verified=True,
            )
            Token.objects.create(
                id=uuid4(),
                user=user,
                access_token=self.faker.sha256(),
                refresh_token=self.faker.sha256(),
            )

    def create_products(self, records):
        users = CustomUser.objects.all()
        for _ in range(records):
            user = random.choice(users)
            Product.objects.create(
                id=uuid4(),
                user=user,
                name=self.faker.word(),
                description=self.faker.text(),
                category=self.faker.word(),
                price=random.uniform(10.0, 100.0),
                quantity_available=random.randint(1, 50),
                unit_of_measurement='kg',
                perishable=bool(random.getrandbits(1)),
                expiration_date=timezone.now() + timedelta(days=random.randint(1, 100)),
                image=f'product_images/{self.faker.word()}.jpg',
            )

    def create_orders(self, records):
        users = CustomUser.objects.all()
        products = Product.objects.all()
        for _ in range(records):
            user = random.choice(users)
            product = random.choice(products)
            Order.objects.create(
                id=uuid4(),
                user=user,
                product=product,
                quantity=random.randint(1, 10),
                total_price=product.price * random.randint(1, 10),
                order_status='Pending',
            )

    def create_reviews(self, records):
        users = CustomUser.objects.all()
        products = Product.objects.all()
        for _ in range(records):
            reviewer = random.choice(users)
            reviewee = random.choice(users)
            product = random.choice(products)
            Review.objects.create(
                id=uuid4(),
                product=product,
                reviewer=reviewer,
                reviewee=reviewee,
                rating=random.randint(1, 5),
                text=self.faker.text(),
            )