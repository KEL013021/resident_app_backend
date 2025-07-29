# Use official PHP image with Apache
FROM php:8.2-apache

# Copy your PHP files to the Apache server root
COPY ./database/ /var/www/html/

# Expose port 80
EXPOSE 80
