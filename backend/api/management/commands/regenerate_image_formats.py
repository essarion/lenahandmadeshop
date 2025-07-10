from django.core.management.base import BaseCommand
from api.models import Service, Advantage, ProductShowcaseItem
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image
import os


def convert_image_to_format(image_field_file, format: str) -> ContentFile:
    """
    Конвертирует изображение (Django FileField) в формат WebP или AVIF
    и возвращает ContentFile для сохранения в модель.
    """
    image_field_file.open()  # Открываем файл (если он еще не открыт)
    img = Image.open(image_field_file)
    img = img.convert("RGBA")  # Для корректной работы с прозрачностью

    buffer = BytesIO()
    if format.lower() == "webp":
        img.save(
            buffer, format="WEBP", quality=85, method=6
        )  # method — качество кодирования
    elif format.lower() == "avif":
        img.save(buffer, format="AVIF", quality=85)
    else:
        raise ValueError(f"Unsupported format: {format}")

    buffer.seek(0)
    ext = format.lower()
    file_name = os.path.splitext(os.path.basename(image_field_file.name))[0] + f".{ext}"

    return ContentFile(buffer.read(), name=file_name)


class Command(BaseCommand):
    help = "Regenerate WebP and AVIF images for all records in image models"

    def handle(self, *args, **kwargs):
        models = [Service, Advantage, ProductShowcaseItem]

        for model in models:
            self.stdout.write(f"Processing model {model.__name__}...")
            queryset = model.objects.all()
            count = queryset.count()
            self.stdout.write(f"Found {count} records.")

            for obj in queryset:
                image_field = None
                if hasattr(obj, "image"):
                    image_field = "image"
                elif hasattr(obj, "icon"):
                    image_field = "icon"
                elif hasattr(obj, "background_image"):
                    image_field = "background_image"

                if not image_field:
                    self.stdout.write(f"Skipping {obj} — no recognized image field.")
                    continue

                original_image = getattr(obj, image_field)
                if not original_image:
                    self.stdout.write(f"Skipping {obj} — no original image found.")
                    continue

                try:
                    # Конвертируем и сохраняем WebP
                    webp_file = convert_image_to_format(original_image, "webp")
                    # Конвертируем и сохраняем AVIF
                    avif_file = convert_image_to_format(original_image, "avif")

                    # Определяем поля для webp и avif (в зависимости от модели)
                    webp_field_name = None
                    avif_field_name = None

                    # Можно жёстко прописать для каждой модели, или проверять атрибуты
                    if hasattr(obj, "webp_icon") and hasattr(obj, "avif_icon"):
                        webp_field_name = "webp_icon"
                        avif_field_name = "avif_icon"
                    elif hasattr(obj, "webp_image") and hasattr(obj, "avif_image"):
                        webp_field_name = "webp_image"
                        avif_field_name = "avif_image"

                    if webp_field_name and avif_field_name:
                        setattr(obj, webp_field_name, webp_file)
                        setattr(obj, avif_field_name, avif_file)
                        obj.save(update_fields=[webp_field_name, avif_field_name])
                        self.stdout.write(f"Processed {obj} ({image_field})")
                    else:
                        self.stdout.write(
                            f"Skipping {obj} — no target webp/avif fields found."
                        )

                except Exception as e:
                    self.stdout.write(f"Error processing {obj}: {e}")

        self.stdout.write("Done!")
