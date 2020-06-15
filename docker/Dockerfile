# --- builder ---
FROM starefossen/ruby-node:2-8 as builder

ARG GITHUB_TOKEN
ARG GIST_ID

ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV GIST_ID=$GIST_ID

WORKDIR /var/www/build

ENV TZ=Europe/Warsaw

RUN echo $TZ | tee /etc/timezone \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && npm install -g -q pm2@3

COPY . .

RUN bundle install --path=vendor
RUN bundle exec middleman build

RUN npm install -q --production
RUN npm install mime@1.4.0

EXPOSE 8080

CMD ["pm2-docker", "server.js"]
