from django.contrib import admin
from .models import Member, Individual, Organization, VLXD, Post

class MemberAdmin(admin.ModelAdmin):
    list_display = ('username', 'rank', 'is_individual', 'is_organization', 'is_vlxd', 'is_active', 'is_staff')
    search_fields = ('username', 'rank', 'is_individual', 'is_organization', 'is_vlxd')
    list_filter = ('rank', 'is_individual', 'is_organization', 'is_vlxd', 'is_active')  

class IndividualAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email')
    search_fields = ('name', 'phone', 'email')

class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'tax_num', 'phone', 'email')
    search_fields = ('name', 'tax_num', 'phone', 'email')

class VLXDAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'job')
    search_fields = ('name', 'phone', 'email', 'job')

# New PostAdmin for the Post model
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'name', 'like_count', 'created_at', 'updated_at')  # Show post title, author name (as CharField), likes, and timestamps
    search_fields = ('title', 'name', 'caption')  # Allow searching by title, name (author's name), and caption
    list_filter = ('created_at', 'updated_at')  # Add filtering options for creation and modification timestamps
    readonly_fields = ('like_count',)  # Make the like_count read-only in admin

    def like_count(self, obj):
        """
        Display the number of likes for the post.
        """
        return obj.like_count()

    like_count.short_description = "Number of Likes"  # Customize column name in admin

# Register all models
admin.site.register(Member, MemberAdmin)
admin.site.register(Individual, IndividualAdmin)
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(VLXD, VLXDAdmin)
admin.site.register(Post, PostAdmin)
