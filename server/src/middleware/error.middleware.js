function  errorMiddleware(error, req, response, next) {
    console.error(error.stack);
    const status = error.status || 500;
    const message = error.message || 'Something went wrong !';
    response
        .status(status)
        .send({
            message,
            status,
        });
}

export { errorMiddleware };
