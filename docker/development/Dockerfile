FROM node:12-buster AS v1-build

COPY . /build
WORKDIR /build
RUN yarn install
RUN yarn build
COPY .env.hml .env

FROM debian:buster
COPY docker/install.sh /install.sh
RUN /install.sh

WORKDIR /opt/run

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=v1-build /build /opt/app/v1

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/development/nginx.conf /etc/nginx/sites-enabled/default
COPY docker/development/entrypoint.sh /opt/run/entrypoint.sh
COPY docker/development/kill-supervisord.sh /opt/run/kill-supervisord.sh
COPY docker/development/supervisord.conf /opt/run/supervisord.conf

ENV ENVIRONMENT development
ENV NODE_ENV development
EXPOSE 80

CMD ["./entrypoint.sh"]
