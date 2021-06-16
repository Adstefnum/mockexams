from django.shortcuts import render
from django.views.generic import ListView


class IndexView(ListView):
	template_name = "mockexamsapp/index.html"

	def home(self, request):
		static = {'js' : 'home', 'css' : 'home'}
		return render(request, self.template_name, static)

	def signup(self, request):
		static = {'js' : 'signup', 'css' : 'signup'}
		return render(request, self.template_name, static)

	def get_queryset(self):
		pass
