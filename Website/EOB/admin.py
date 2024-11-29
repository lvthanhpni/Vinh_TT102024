from django.contrib import admin
from .models import Member, Individual, Organization, VLXD

class MemberAdmin(admin.ModelAdmin):
    list_display = ('username', 'rank', 'is_individual', 'is_organization', 'is_vlxd', 'is_active', 'is_staff')
    search_fields = ('username', 'rank', 'is_individual', 'is_organization', 'is_vlxd')
    list_filter = ('rank', 'is_individual', 'is_organization', 'is_vlxd', 'is_active')  

class IndividualAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email')  # Changed from 'full_name' to 'name'
    search_fields = ('name', 'phone', 'email')  # Changed from 'full_name' to 'name'

class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'tax_num', 'phone', 'email')  # Changed from 'c_name' to 'name'
    search_fields = ('name', 'tax_num', 'phone', 'email')  # Changed from 'c_name' to 'name'

class VLXDAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'job')  # Changed from 'c_name' to 'name'
    search_fields = ('name', 'phone', 'email', 'job')  # Changed from 'c_name' to 'name'

admin.site.register(Member, MemberAdmin)
admin.site.register(Individual, IndividualAdmin)
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(VLXD, VLXDAdmin)
