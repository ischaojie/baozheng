from django.db import models

# Create your models here.

# Source 源数据 model


class Source(models.Model):
    # 标题
    head = models.CharField(max_length=200)
    # 内容
    detail = models.TextField(blank=True)
    # 分类（目前只有两类：正、反）
    category = models.BooleanField(blank=True)
    # 是否标记
    marked = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.head
