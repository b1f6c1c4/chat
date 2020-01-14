FROM golang:latest
# FROM alpine:latest
COPY entrypoint.sh VERSION keygen server tinode-db /root/
COPY templ/ /root/templ/
WORKDIR /root/
RUN mkdir static
ENTRYPOINT ["/root/entrypoint.sh"]
CMD ["/root/server", "-config", "/etc/chat/tinode.conf"]
EXPOSE 6060/tcp
