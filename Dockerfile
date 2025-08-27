# Imagem base
FROM php:8.2-apache

# Copia o projeto para o diretório padrão do Apache
COPY . /var/www/html/

# Ativa mod_rewrite
RUN a2enmod rewrite

# Configura permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expõe porta
EXPOSE 80
