FROM httpd:2.4

# WORKDIR /var/www/html/

# COPY domain.apache.conf /usr/local/apache2/conf/domain.apache.conf

COPY . /usr/local/apache2/htdocs/.
# ADD . /usr/local/apache2/htdocs/.

#VOLUME $(PWD)/.:/usr/local/apache2/htdocs/.

# RUN echo "Include /usr/local/apache2/conf/domain.apache.conf" \
#     >> /usr/local/apache2/conf/httpd.conf

# EXPOSE 80:80

