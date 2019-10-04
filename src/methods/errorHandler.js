function errorHandler(app, error) {
    if (error.response) {
        app.$message.error(error.response.data, 5);
    } else {
        // console.log(error);
    }
}

export default errorHandler