/**
 * Set common errors status and message
 */
function setError(res, statusCode, message = "") {
    
    switch (statusCode) {
        case 204:
            message = (message == "" ? "204 No content" : message)
            res.status(204).json({status: 204, message })
            break
        case 404:
            message = (message == "" ? "404 Not found" : message)
            res.status(404).json({error: true, status: 404, message })
            break
        default:
            message = (message == "" ? "500 Internal server error" : message)
            res.status(500).json({error: true, status: 500, message })
            break
    }

}

module.exports = { setError }