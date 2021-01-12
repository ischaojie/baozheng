from django.db import models


# Create your models here.

# Origin 数据源
class Origin(models.Model):
    # 目标
    name = models.CharField(max_length=50)
    # 描述
    description = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.name}'


# Source 源数据 model
class Source(models.Model):
    CATEGORY_CHOICES = [
        (0, 'fake'),
        (1, 'real')
    ]

    # 标题
    head = models.CharField(max_length=200)
    # 内容
    detail = models.TextField(blank=True, null=True)
    # 分类（目前只有两类：正、反）
    category = models.IntegerField(blank=True, null=True, choices=CATEGORY_CHOICES)
    # 是否标记
    marked = models.BooleanField(default=False)
    # 数据所属源
    origin = models.ForeignKey(Origin, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.origin}: {self.head}'

    def origin_name(self):
        return self.origin.name

    origin_name.short_description = 'Origin'
