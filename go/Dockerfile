# Crie uma imagem a partir do Golang com a tag 1.17
FROM golang:1.17 as builder

# Crie um diretório dentro do container
WORKDIR /app

# Copie o arquivo "main.go" para o diretório /app dentro do container
COPY main.go .

# Compile o código Go para uma imagem "scratch" usando o compilador Go
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# Crie uma imagem "scratch" vazia
FROM scratch

# Copie o arquivo binário compilado do container anterior para a imagem "scratch"
COPY --from=builder /app/app .

# Execute o arquivo binário ao iniciar o container
CMD ["/app"]