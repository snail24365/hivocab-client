# Run Stage
FROM alpine:3.15
RUN ["apk", "add", "git"]
RUN ["apk", "add", "nodejs"]
RUN ["apk", "add", "npm"]
RUN git clone https://github.com/snail24365/hivocab-client /root/app
WORKDIR /root/app

EXPOSE 3000
RUN npm ci
RUN npm run build
RUN npm i -S serve

ENTRYPOINT ["serve" "-s" "build"]