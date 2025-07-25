# Generated by Django 5.2.1 on 2025-06-05 11:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AboutCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('text', models.TextField()),
            ],
            options={
                'verbose_name': 'О компании',
                'verbose_name_plural': 'О компании',
            },
        ),
        migrations.CreateModel(
            name='Advantage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('icon', models.ImageField(upload_to='advantages/')),
            ],
            options={
                'verbose_name': 'Преимущество',
                'verbose_name_plural': 'Преимущества',
            },
        ),
        migrations.CreateModel(
            name='CatalogIntro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('text', models.TextField()),
            ],
            options={
                'verbose_name': 'Вступление к каталогу',
                'verbose_name_plural': 'Вступление к каталогу',
            },
        ),
        migrations.CreateModel(
            name='ContactInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('phone', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'verbose_name': 'Блок контактов',
                'verbose_name_plural': 'Блок контактов',
            },
        ),
        migrations.CreateModel(
            name='DeliveryInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('text', models.TextField()),
            ],
            options={
                'verbose_name': 'Информация о доставке',
                'verbose_name_plural': 'Информация о доставке',
            },
        ),
        migrations.CreateModel(
            name='ProductShowcase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Наша продукция', max_length=200)),
            ],
            options={
                'verbose_name': "Блок 'Наша продукция'",
                'verbose_name_plural': "Блок 'Наша продукция'",
            },
        ),
        migrations.CreateModel(
            name='WelcomeSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('text', models.TextField()),
            ],
            options={
                'verbose_name': 'Приветствие на главной',
                'verbose_name_plural': 'Приветствие на главной',
            },
        ),
        migrations.CreateModel(
            name='ProductShowcaseItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('background_image', models.ImageField(upload_to='showcase/')),
                ('text_top', models.CharField(max_length=200)),
                ('page_name', models.CharField(help_text='Название страницы/категории (используется для ссылки)', max_length=200)),
                ('text_bottom', models.TextField()),
                ('showcase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='api.productshowcase')),
            ],
            options={
                'verbose_name': "Элемент блока 'Наша продукция'",
                'verbose_name_plural': "Элементы блока 'Наша продукция'",
            },
        ),
    ]
