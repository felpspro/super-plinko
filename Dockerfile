# Usa imagem base do Nginx
FROM nginx:alpine

# Copia os arquivos do jogo para a pasta padrão do nginx
COPY . /usr/share/nginx/html

# Expõe a porta
EXPOSE 80
