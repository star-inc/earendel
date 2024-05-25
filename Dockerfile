FROM node:20-alpine

ENV RUNTIME_ENV container

RUN addgroup \
        -g 3000 \
        scarlet
RUN adduser -HD \
        -u 3000 \
        -G scarlet \
        -h /workplace \
        flandre

RUN mkdir -p /.npm /workplace
WORKDIR /workplace
ADD . /workplace

RUN chown -R \
        3000:3000 \
        /.npm /workplace

USER 3000
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
