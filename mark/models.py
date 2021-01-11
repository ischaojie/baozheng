from django.db import models


# Create your models here.

# Origin 数据源
class Origin(models.Model):
    # 目标
    name = models.CharField(max_length=50)
    # 描述
    description = models.CharField(max_length=100)


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
    # 数据所属源
    origin = models.ForeignKey(Origin, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.origin}: {self.head}'
