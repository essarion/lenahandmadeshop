import os
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile
from django.db import models


class AutoImageFormatsMixin(models.Model):
    webp_image = models.ImageField(
        upload_to="images/webp/", blank=True, null=True, editable=False
    )
    avif_image = models.ImageField(
        upload_to="images/avif/", blank=True, null=True, editable=False
    )

    class Meta:
        abstract = True

    def generate_format_versions(self, original_image_field):
        original = getattr(self, original_image_field)
        if not original:
            return

        webp_field = f"webp_{original_image_field}"
        avif_field = f"avif_{original_image_field}"

        # Проверяем, что такие поля существуют в модели, чтобы избежать ошибок
        if not hasattr(self, webp_field) or not hasattr(self, avif_field):
            print(
                f"Warning: fields {webp_field} or {avif_field} do not exist on model {self.__class__.__name__}"
            )
            return

        try:
            img = Image.open(original)
            img = img.convert("RGB")

            base_name, _ = os.path.splitext(os.path.basename(original.name))

            # WebP
            webp_io = BytesIO()
            img.save(webp_io, format="WEBP", quality=85)
            getattr(self, webp_field).save(
                f"{base_name}.webp", ContentFile(webp_io.getvalue()), save=False
            )

            # AVIF
            avif_io = BytesIO()
            img.save(avif_io, format="AVIF", quality=85)
            getattr(self, avif_field).save(
                f"{base_name}.avif", ContentFile(avif_io.getvalue()), save=False
            )

        except Exception as e:
            print("Image conversion error:", e)
