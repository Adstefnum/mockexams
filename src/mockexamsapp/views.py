from django.shortcuts import render
from django.views.generic import ListView


class IndexView(ListView):
	template_name = "mockexamsapp/index.html"

	def get_queryset(self):
		pass
