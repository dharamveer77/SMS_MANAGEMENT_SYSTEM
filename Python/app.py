from app import create_app  # Adjust to your package structure



if __name__ == '__main__':
    app = create_app()
    port = 8000
    print("Server started on PORT " + str(port))
    app.run(debug=True, port=port)

