# Use official PHP image with Apache
FROM php:8.2-apache

# Install mysqli extension and enable it
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Optional: Enable Apache mod_rewrite (useful for clean URLs)
RUN a2enmod rewrite

# Copy your PHP files to the Apache server root
COPY ./database/ /var/www/html/

# Set working directory (optional but good practice)
WORKDIR /var/www/html

# Expose port 80
EXPOSE 80
