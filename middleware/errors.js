const handleValidationErrors = (error, response) => {
    const errors = Object.values(error.errors).map(element => element.message);
    if (errors.length > 1) {
        const errorMessages = errors.join(" || ");
        response.status(400).send({ messages: errorMessages });
    } else {
        response.status(400).send({ message: errors });
    }
};

const handleTypeError = (error, request, response, next) => {
    if (error.name === "ValidationError") {
        handleValidationErrors(error, response);
    } else if (error.code === 11000) {
        response.status(400).send("El correo tiene que ser único");
    } else {
        response.status(500).send("Hubo un problema");
    }
};

module.exports = { handleTypeError };