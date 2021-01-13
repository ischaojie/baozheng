from django import forms


class SourceJudgeForm(forms.Form):
    category_choice = [(1, 'real'), (0, 'fake')]
    category = forms.ChoiceField(widget=forms.RadioSelect, choices=category_choice)
