# Usando PHP com Apache
FROM php:8.2-apache

# Copiando os arquivos do projeto para o diretório padrão do Apache
COPY . /var/www/html/

# Expondo a porta 80
EXPOSE 80

# O Apache já é iniciado automaticamente na imagem php:apache
