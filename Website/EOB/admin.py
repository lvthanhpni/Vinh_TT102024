from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Member, Individual, Organization, VLXD

class MemberAdmin(admin.ModelAdmin):
    list_display = ('username', 'is_individual', 'is_organization', 'is_vlxd', 'is_active', 'is_staff')
    search_fields = ('username', 'is_individual', 'is_organization', 'is_vlxd')

class IndividualAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'email')
    search_fields = ('full_name', 'phone', 'email')

class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('c_name', 'tax_num', 'phone', 'email')
    search_fields = ('c_name', 'tax_num', 'phone', 'email')

class VLXDAdmin(admin.ModelAdmin):
    list_display = ('c_name', 'phone', 'email', 'job')
    search_fields = ('c_name', 'phone', 'email', 'job')

admin.site.register(Member, MemberAdmin)
admin.site.register(Individual, IndividualAdmin)
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(VLXD, VLXDAdmin)
